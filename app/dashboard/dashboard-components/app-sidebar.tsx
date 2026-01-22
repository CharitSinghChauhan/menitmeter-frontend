"use client";

// TODO :
import * as React from "react";
import {
  Home01Icon,
  UserIcon,
  Folder01Icon,
  UserGroupIcon,
  FileAddIcon,
  Layout01Icon,
  PuzzleIcon,
  Mortarboard01Icon,
  HelpCircleIcon,
  Delete02Icon,
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
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Mock data for the sidebar
const mainNav = [
  {
    title: "Home",
    url: "#",
    icon: Home01Icon,
    isActive: true,
  },
  {
    title: "My presentations",
    url: "#",
    icon: UserIcon,
  },
  {
    title: "Shared with me",
    url: "#",
    icon: Folder01Icon,
  },
];

const workspaceNav = [
  {
    title: "Workspace presentations",
    url: "#",
    icon: UserGroupIcon,
  },
  {
    title: "Shared templates",
    url: "#",
    icon: FileAddIcon,
  },
];

const bottomNav = [
  {
    title: "Templates",
    url: "#",
    icon: Layout01Icon,
  },
  {
    title: "Integrations",
    url: "#",
    icon: PuzzleIcon,
  },
  {
    title: "Menti Academy",
    url: "#",
    icon: Mortarboard01Icon,
  },
  {
    title: "Help",
    url: "#",
    icon: HelpCircleIcon,
  },
  {
    title: "Trash",
    url: "#",
    icon: Delete02Icon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r-2 border-border bg-card"
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
              <div className="flex aspect-square size-8 items-center justify-center rounded-none border-2 border-border bg-primary text-primary-foreground shadow-sm transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
                <span className="font-head text-xl font-bold">M</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden pl-2">
                <span className="truncate font-head text-lg font-bold">
                  Mentimeter
                </span>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  Free Plan
                </span>
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

        <SidebarGroup>
          <SidebarGroupLabel className="font-head text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {workspaceNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<a href={item.url} />}
                    tooltip={item.title}
                    className="border-2 border-transparent px-3 py-5 font-medium transition-all hover:border-border hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:translate-y-0.5"
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
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto" />

        <SidebarGroup className="mt-auto">
          <SidebarMenu className="gap-2">
            {bottomNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<a href={item.url} />}
                  tooltip={item.title}
                  className="border-2 border-transparent px-3 py-5 font-medium transition-all hover:border-border hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:translate-y-0.5"
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
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* Footer content if needed later */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
