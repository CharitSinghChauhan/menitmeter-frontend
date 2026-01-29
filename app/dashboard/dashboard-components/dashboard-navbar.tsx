"use client";

// TODO :
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SearchIcon,
  Notification01Icon,
  LogoutIcon,
  User,
} from "@hugeicons/core-free-icons";
import { authClient, signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/retroui/Loader";
import { Avatar } from "@/components/retroui/Avatar";
import { Input } from "@/components/retroui/Input";
import { Button } from "@/components/retroui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
        <Button variant="ghost" size="icon" className="">
          <HugeiconsIcon icon={Notification01Icon} size={20} />
        </Button>
        {isPending ? (
          <Loader />
        ) : data ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-9 h-9">
                <Avatar.Fallback className="rounded-none">
                  <HugeiconsIcon icon={User} className="text-black" />
                </Avatar.Fallback>
              </Avatar>
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
          // TODO :
          <div>Error</div>
        )}
      </div>
    </header>
  );
}
