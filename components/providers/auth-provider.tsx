"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession, type Session } from "@/lib/auth";

type AuthContextType = {
  session: Session | undefined;
  isPending: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [isPending, setIsPending] = useState(true);

  const fetchSession = async () => {
    try {
      // If we don't have the presence cookie, we can optimize and skip the fetch
      // but getSession handles the null check anyway.
      const data = await getSession();
      setSession(data);
    } catch {
      setSession(null);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isPending, refresh: fetchSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
