"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboardIcon,
  FolderIcon,
  DatabaseIcon,
  FileTextIcon,
  BriefcaseBusinessIcon,
  FileIcon,
  GlobeIcon,
  User,
} from "lucide-react";

import { NavMain } from "@/components/admin/dashboard/nav-main";
import { NavSecondary } from "@/components/admin/dashboard/nav-secondary";
import { NavUser } from "@/components/admin/dashboard/nav-user";
import Logo from "../../layout/logo";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Satya Prakash",
    email: "satyaprakashh.dev@gmail.com",
    avatar: "/images/profile.png",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "About",
      url: "/admin/dashboard/about",
      icon: <User />,
    },
    {
      title: "Resume",
      url: "/admin/dashboard/resume",
      icon: <FileIcon />,
    },
    {
      title: "Skills",
      url: "/admin/dashboard/skills",
      icon: <DatabaseIcon />,
    },
    {
      title: "Projects",
      url: "/admin/dashboard/projects",
      icon: <FolderIcon />,
    },
    {
      title: "Certificates",
      url: "/admin/dashboard/certificates",
      icon: <FileTextIcon />,
    },
    {
      title: "Experience",
      url: "/admin/dashboard/experience",
      icon: <BriefcaseBusinessIcon />,
    },
  ],

  navSecondary: [
    {
      title: "Portfolio",
      url: "/",
      icon: <GlobeIcon />,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5"
            >
              <Link href="/admin/dashboard">
                <Logo />
                <span className="text-base font-semibold">Portfolio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}