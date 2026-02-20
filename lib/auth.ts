/**
 * auth.ts — Client-side auth helpers for Google-only sign-in.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const PRESENCE_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

function setPresenceCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `ba-present=1; Max-Age=${PRESENCE_COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

function clearPresenceCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `ba-present=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
}

export async function signInWithGoogleIdToken(idToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) return false;

    setPresenceCookie();
    return true;
  } catch {
    return false;
  }
}

export async function signOut(): Promise<void> {
  try {
    await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    clearPresenceCookie();
    window.location.href = "/";
  }
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type Session = { user: SessionUser } | null;

export async function getSession(): Promise<Session> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Session;
  } catch {
    return null;
  }
}
