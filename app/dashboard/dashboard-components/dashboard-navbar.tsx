"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SearchIcon,
  Notification01Icon,
  StarIcon,
  LogoutIcon,
} from "@hugeicons/core-free-icons";
import { authClient, signOut } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function DashboardNavbar() {
  const { data, isPending } = authClient.useSession();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="flex flex-1 items-center justify-center max-w-xl mx-auto">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <HugeiconsIcon icon={SearchIcon} size={18} />
          </div>
          <Input
            placeholder="Search presentations, folders, and pages"
            className="pl-10 bg-muted/50 border-none shadow-none focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="default"
          className="hidden md:flex gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-sm"
        >
          <HugeiconsIcon icon={StarIcon} size={16} />
          Upgrade
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <HugeiconsIcon icon={Notification01Icon} size={20} />
        </Button>
        {isPending ? (
          <Spinner />
        ) : data ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border border-orange-200 text-orange-700 cursor-pointer outline-none transition-colors hover:bg-orange-200">
              <span className="font-medium text-sm">C</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button
                className="text-destructive focus:text-destructive cursor-pointer w-full "
                onClick={handleSignOut}
                variant="ghost"
              >
                Sign out <HugeiconsIcon icon={LogoutIcon} size={16} />
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border border-orange-200 text-orange-700 cursor-pointer">
            <span className="font-medium text-sm">C</span>
          </div>
        )}
      </div>
    </header>
  );
}
