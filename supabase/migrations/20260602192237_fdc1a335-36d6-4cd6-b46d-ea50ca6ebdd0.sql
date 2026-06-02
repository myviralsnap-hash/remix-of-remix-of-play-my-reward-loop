
-- 1. Role enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. has_role security-definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 3. RLS policies on user_roles
CREATE POLICY "Users view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Admin policies on withdrawals
CREATE POLICY "Admins view all withdrawals"
  ON public.withdrawals FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update withdrawals"
  ON public.withdrawals FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Approve withdrawal (manual fulfillment, stores code in admin_notes)
CREATE OR REPLACE FUNCTION public.approve_withdrawal(p_id uuid, p_code text)
RETURNS public.withdrawals
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  wd public.withdrawals;
BEGIN
  IF uid IS NULL OR NOT public.has_role(uid, 'admin') THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF p_code IS NULL OR length(trim(p_code)) < 3 THEN
    RAISE EXCEPTION 'Please provide the gift card code';
  END IF;

  SELECT * INTO wd FROM public.withdrawals WHERE id = p_id FOR UPDATE;
  IF wd.id IS NULL THEN RAISE EXCEPTION 'Withdrawal not found'; END IF;
  IF wd.status <> 'pending' THEN
    RAISE EXCEPTION 'Withdrawal already %', wd.status;
  END IF;

  UPDATE public.withdrawals
    SET status = 'paid',
        admin_notes = jsonb_build_object(
          'code', trim(p_code),
          'approved_by', uid,
          'approved_at', now()
        )::text
    WHERE id = p_id
    RETURNING * INTO wd;

  RETURN wd;
END $$;

-- 6. Reject withdrawal + refund points
CREATE OR REPLACE FUNCTION public.reject_withdrawal(p_id uuid, p_reason text)
RETURNS public.withdrawals
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  wd public.withdrawals;
BEGIN
  IF uid IS NULL OR NOT public.has_role(uid, 'admin') THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF p_reason IS NULL OR length(trim(p_reason)) < 3 THEN
    RAISE EXCEPTION 'Please provide a rejection reason';
  END IF;

  SELECT * INTO wd FROM public.withdrawals WHERE id = p_id FOR UPDATE;
  IF wd.id IS NULL THEN RAISE EXCEPTION 'Withdrawal not found'; END IF;
  IF wd.status <> 'pending' THEN
    RAISE EXCEPTION 'Withdrawal already %', wd.status;
  END IF;

  -- Refund the points that were deducted
  UPDATE public.profiles
    SET points = points + wd.points
    WHERE id = wd.user_id;

  INSERT INTO public.transactions (user_id, type, points, meta)
  VALUES (wd.user_id, 'withdrawal_refund', wd.points,
    jsonb_build_object('withdrawal_id', wd.id, 'reason', trim(p_reason)));

  UPDATE public.withdrawals
    SET status = 'rejected',
        admin_notes = jsonb_build_object(
          'reason', trim(p_reason),
          'rejected_by', uid,
          'rejected_at', now()
        )::text
    WHERE id = p_id
    RETURNING * INTO wd;

  RETURN wd;
END $$;

-- 7. Helper to list pending withdrawals with the user's display name
CREATE OR REPLACE FUNCTION public.admin_list_withdrawals(p_status text DEFAULT 'pending')
RETURNS TABLE (
  id uuid,
  user_id uuid,
  user_name text,
  user_email text,
  points integer,
  gift_card_brand text,
  recipient_email text,
  status text,
  admin_notes text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT w.id, w.user_id,
         COALESCE(p.name, 'Player') AS user_name,
         p.email AS user_email,
         w.points, w.gift_card_brand, w.recipient_email,
         w.status, w.admin_notes, w.created_at
    FROM public.withdrawals w
    LEFT JOIN public.profiles p ON p.id = w.user_id
   WHERE (p_status = 'all' OR w.status = p_status)
     AND public.has_role(auth.uid(), 'admin')
   ORDER BY w.created_at DESC
   LIMIT 200;
$$;
