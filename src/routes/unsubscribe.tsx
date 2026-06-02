import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MailX, CheckCircle2, AlertTriangle } from "lucide-react";

type Status = "loading" | "ready" | "already" | "invalid" | "done" | "error";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  head: () => ({
    meta: [
      { title: "Unsubscribe — RewardLoop" },
      {
        name: "description",
        content: "Manage your RewardLoop email preferences.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function UnsubscribePage() {
  const { token } = useSearch({ from: "/unsubscribe" });
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setMessage("Missing unsubscribe token.");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `/email/unsubscribe?token=${encodeURIComponent(token)}`
        );
        const body = await res.json().catch(() => ({}));
        if (res.ok && body?.valid) {
          if (body.used) setStatus("already");
          else setStatus("ready");
        } else {
          setStatus("invalid");
          setMessage(body?.error || "This unsubscribe link is invalid.");
        }
      } catch {
        setStatus("error");
        setMessage("Could not reach the server. Please try again.");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) setStatus("done");
      else {
        setStatus("error");
        setMessage(body?.error || "Failed to unsubscribe.");
      }
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            {status === "done" || status === "already" ? (
              <CheckCircle2 className="w-6 h-6 text-success" />
            ) : status === "invalid" || status === "error" ? (
              <AlertTriangle className="w-6 h-6 text-destructive" />
            ) : (
              <MailX className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <CardTitle className="text-xl">
            {status === "done" || status === "already"
              ? "You're unsubscribed"
              : status === "invalid"
                ? "Invalid link"
                : status === "error"
                  ? "Something went wrong"
                  : "Unsubscribe from RewardLoop emails"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {status === "loading" && (
            <div className="flex items-center justify-center text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Checking…
            </div>
          )}
          {status === "ready" && (
            <>
              <p className="text-sm text-muted-foreground">
                Click the button below to stop receiving non-essential emails
                from RewardLoop. You'll still receive critical account messages
                (security, redemptions, etc.).
              </p>
              <Button onClick={confirm} className="w-full">
                Confirm unsubscribe
              </Button>
            </>
          )}
          {status === "already" && (
            <p className="text-sm text-muted-foreground">
              This email address has already been unsubscribed.
            </p>
          )}
          {status === "done" && (
            <p className="text-sm text-muted-foreground">
              You won't receive marketing emails from RewardLoop anymore.
            </p>
          )}
          {(status === "invalid" || status === "error") && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
