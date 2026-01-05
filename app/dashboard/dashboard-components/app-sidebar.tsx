"use client"

import * as React from "react"
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
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

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
} from "@/components/ui/sidebar"
import Link from "next/link"

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
]

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
]

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
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <span className="font-bold text-lg">M</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mentimeter</span>
                  <span className="truncate text-xs">Free Plan</span>
                </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton render={<a href={item.url} />} isActive={item.isActive} tooltip={item.title}>
                  <HugeiconsIcon icon={item.icon || Home01Icon} />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />} tooltip={item.title}>
                    <HugeiconsIcon icon={item.icon || Home01Icon} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-auto" />
        
        <SidebarGroup className="mt-auto">
             <SidebarMenu>
              {bottomNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />} tooltip={item.title}>
                      <HugeiconsIcon icon={item.icon || Home01Icon} />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
