"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SignIn from "../sign-in";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

export default function Navbar() {
  const { data, isPending } = authClient.useSession();

  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold text-lg">M</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">Mentimeter</span>
        </Link>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner className="size-4" />
              <span>Loading...</span>
            </div>
          ) : data ? (
            <Button 
              onClick={() => router.push("/dashboard")} 
              variant="default"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger render={
                <Button variant="outline" className="font-semibold">
                  Log in
                </Button>
              } />
              <DialogContent className="sm:max-w-md p-0 border-none bg-transparent shadow-none">
                <SignIn />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  );
}
