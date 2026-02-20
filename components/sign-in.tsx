"use client";

import { useEffect, useRef, useState } from "react";
import { signInWithGoogleIdToken } from "@/lib/auth";
import { Card } from "./retroui/Card";
import { Text } from "./retroui/Text";
import { Dialog } from "./retroui/Dialog";
import { Loader } from "./retroui/Loader";

const GOOGLE_SCRIPT_ID = "google-identity-services";

function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existing = document.getElementById(
      GOOGLE_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google script")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google script"));
    document.head.appendChild(script);
  });
}

export default function SignIn() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const defaultGoogleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? null;

  const [googleClientId, setGoogleClientId] = useState<string | null>(
    defaultGoogleClientId,
  );
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (googleClientId) return;

    let isMounted = true;

    const fetchClientId = async () => {
      if (!backendUrl) {
        if (!isMounted) return;
        setError("Google sign-in is not configured.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/auth/google/client-id`, {
          cache: "no-store",
        });

        if (!response.ok) {
          if (!isMounted) return;
          setError("Google sign-in is not configured.");
          setLoading(false);
          return;
        }

        const data = (await response.json()) as {
          success?: boolean;
          clientId?: string;
        };

        if (!isMounted) return;

        if (data.success && data.clientId) {
          setGoogleClientId(data.clientId);
          return;
        }

        setError("Google sign-in is not configured.");
      } catch {
        if (!isMounted) return;
        setError("Google sign-in is not configured.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchClientId();

    return () => {
      isMounted = false;
    };
  }, [backendUrl, googleClientId]);

  useEffect(() => {
    let isMounted = true;

    if (!googleClientId) return;

    const setupGoogleSignIn = async () => {
      try {
        setLoading(true);
        setError(null);

        await loadGoogleScript();
        if (!isMounted || !window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
          client_id: googleClientId,
          ux_mode: "popup",
          callback: async ({ credential }) => {
            if (!credential) {
              setError("Google did not return a credential.");
              return;
            }

            setError(null);
            setLoading(true);
            const isSignedIn = await signInWithGoogleIdToken(credential);

            if (!isSignedIn) {
              setError("Google sign-in failed. Please try again.");
              setLoading(false);
              return;
            }

            window.location.href = "/dashboard";
          },
        });

        if (!buttonContainerRef.current) {
          setLoading(false);
          return;
        }

        buttonContainerRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonContainerRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          width: 280,
          shape: "rectangular",
          logo_alignment: "left",
        });

        setLoading(false);
      } catch {
        if (!isMounted) return;
        setError("Failed to load Google sign-in. Please refresh and try again.");
        setLoading(false);
      }
    };

    void setupGoogleSignIn();

    return () => {
      isMounted = false;
      window.google?.accounts?.id?.cancel();
    };
  }, [googleClientId]);

  return (
    <Card>
      <Dialog.Header className="flex justify-center items-center py-4 bg-accent text-accent-foreground border-0 ">
        <Text as={"h4"} className="text-center">
          Sign In
        </Text>
      </Dialog.Header>
      <Card.Content className="flex flex-col items-center gap-3 py-5">
        <div ref={buttonContainerRef} className="w-full flex justify-center" />
        {loading && (
          <div className="flex items-center gap-2 text-sm">
            <Loader />
            <Text as={"p"} className="text-sm">
              Preparing Google sign-in...
            </Text>
          </div>
        )}
        {error && (
          <Text as={"p"} className="text-sm text-destructive text-center">
            {error}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}
