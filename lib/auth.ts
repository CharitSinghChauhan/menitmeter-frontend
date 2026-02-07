import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authClient = createAuthClient({
  baseURL: baseURL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
