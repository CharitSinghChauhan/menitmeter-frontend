"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { signIn } from "@/lib/auth";
import { Card } from "./retroui/Card";
import { Button } from "./retroui/Button";
import { Text } from "./retroui/Text";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { Dialog } from "./retroui/Dialog";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const callBackUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + "/dashboard";

  return (
    <Card>
      <Dialog.Header className="flex justify-center items-center py-4 bg-accent text-accent-foreground border-0 ">
        <Text as={"h4"} className="text-center">
          Sign In
        </Text>
      </Dialog.Header>
      <Card.Content>
        <Button
          variant="secondary"
          className={cn("w-full gap-2 flex justify-center items-center")}
          disabled={loading}
          onClick={async () => {
            await signIn.social(
              {
                provider: "google",
                callbackURL: callBackUrl,
              },
              // TODO : Learn
              {
                onRequest: (ctx) => {
                  setLoading(true);
                },
                onResponse: (ctx) => {
                  setLoading(false);
                },
              },
            );
          }}
        >
          <Text
            as={"h5"}
            className="text-center flex justify-center items-center gap-4"
          >
            <HugeiconsIcon icon={GoogleIcon} />
            Google
          </Text>
        </Button>
      </Card.Content>
    </Card>
  );
}
