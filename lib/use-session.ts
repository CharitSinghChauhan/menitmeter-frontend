"use client";

import { useAuth } from "@/components/providers/auth-provider";

export function useSession() {
  const { session, isPending } = useAuth();
  return { data: session, isPending };
}
