"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/utils/utils";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon } from "@hugeicons/core-free-icons";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <Card className="max-w-md ">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-bold text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 ">
          <div
            className={cn(
              "w-full gap-2 flex items-center",
              "justify-between flex-col"
            )}
          >
            <Button
              variant="default"
              className={cn("w-full gap-2")}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/dashboard",
                  },
                  {
                    onRequest: (ctx) => {
                      setLoading(true);
                    },
                    onResponse: (ctx) => {
                      setLoading(false);
                    },
                  }
                );
              }}
            >
              <HugeiconsIcon icon={GoogleIcon}  />
              Sign in with Google
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
