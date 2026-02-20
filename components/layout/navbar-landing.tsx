"use client";

import Link from "next/link";
import SignIn from "../sign-in";
import { useSession } from "@/lib/use-session";
import { useRouter } from "next/navigation";
import { Loader } from "../retroui/Loader";
import { Button } from "../retroui/Button";
import { Dialog } from "../retroui/Dialog";
import { Text } from "../retroui/Text";

export default function Navbar() {
  const { data, isPending } = useSession();

  const router = useRouter();

  return (
    <nav className="sticky top-0 z-10 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* // TOOD : fix the sizing of the log */}
          <div className="flex aspect-square size-8 items-center justify-center  bg-primary text-primary-foreground">
            <span className="font-extrabold text-xl">M</span>
          </div>
          <Text as={"h3"}>Mentimeter</Text>
        </Link>

        {/* Auth Actions */}
        <div className="flex items-center justify-center gap-4">
          {isPending ? (
            <Loader />
          ) : data ? (
            <Button onClick={() => router.push("/dashboard")} variant="default">
              Go to Dashboard
            </Button>
          ) : (
            <Dialog>
              <Dialog.Trigger asChild>
                <Button variant="default" className="font-semibold">
                  Go to Dashboard
                </Button>
              </Dialog.Trigger>
              <Dialog.Content className="sm:max-w-sm">
                <SignIn />
              </Dialog.Content>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  );
}
