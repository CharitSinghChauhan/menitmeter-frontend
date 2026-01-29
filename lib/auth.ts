import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PULBIC_BACKEND_URL
    : "http://localhost:8000";

export const authClient = createAuthClient({
  baseURL: baseURL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
