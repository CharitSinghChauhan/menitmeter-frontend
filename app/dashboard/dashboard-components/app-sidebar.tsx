"use client";

// TODO :
import * as React from "react";
import {
  Home01Icon,
  UserIcon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Mock data for the sidebar
const mainNav = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home01Icon,
    isActive: true,
  },
  {
    title: "My Quizzes",
    url: "#",
    icon: UserIcon,
  },
  {
    title: "Analytics",
    url: "#",
    icon: Folder01Icon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r-2 border-border bg-sidebar"
      {...props}
    >
      <SidebarHeader className="pb-4 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              className="group-data-[collapsible=icon]:p-0! hover:bg-transparent"
            >
              <div className="w-10 h-10 bg-primary border-2 border-black flex-items-center justify-center">
                <span className="text-white flex justify-center items-center h-full">
                  bolt
                </span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden pl-2">
                <h2 className="text-2xl font-black tracking-tighter uppercase italic text-black">
                  Quiz_Arena
                </h2>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<a href={item.url} />}
                  isActive={item.isActive}
                  tooltip={item.title}
                  className="border-2 border-transparent px-3 py-5 font-medium transition-all hover:border-border hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:translate-y-0.5 data-[active=true]:border-border data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-md"
                >
                  <HugeiconsIcon
                    icon={item.icon || Home01Icon}
                    className="size-5"
                  />
                  <span className="text-base">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
