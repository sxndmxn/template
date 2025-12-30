"use client"

import * as React from "react"
import {
  Plane,
  Radar,
  Target,
  BarChart3,
  Settings2,
  FileText,
  Crosshair,
  Radio,
  Activity,
  Shield,
  Zap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Pilot",
    email: "pilot@warthunder.com",
    avatar: "/avatars/pilot.jpg",
  },
  teams: [
    {
      name: "War Thunder",
      logo: Plane,
      plan: "Combat Ready",
    },
    {
      name: "Air Superiority",
      logo: Target,
      plan: "Active",
    },
    {
      name: "Ground Forces",
      logo: Shield,
      plan: "Standby",
    },
  ],
  navMain: [
    {
      title: "Aircraft Database",
      url: "/",
      icon: Plane,
      isActive: true,
      items: [
        {
          title: "All Aircraft",
          url: "/",
        },
        {
          title: "By Nation",
          url: "/dashboard",
        },
        {
          title: "By Battle Rating",
          url: "/dashboard",
        },
        {
          title: "Search Aircraft",
          url: "/",
        },
      ],
    },
    {
      title: "Radar Systems",
      url: "/",
      icon: Radar,
      items: [
        {
          title: "Radar Types",
          url: "/",
        },
        {
          title: "Radar Modes",
          url: "/",
        },
        {
          title: "Look-Down Capable",
          url: "/",
        },
        {
          title: "Guidance Systems",
          url: "/",
        },
      ],
    },
    {
      title: "Sensor Analysis",
      url: "/",
      icon: Activity,
      items: [
        {
          title: "RWR Systems",
          url: "/",
        },
        {
          title: "Countermeasures",
          url: "/",
        },
        {
          title: "Detection Range",
          url: "/",
        },
        {
          title: "Lock-On Mechanics",
          url: "/",
        },
      ],
    },
    {
      title: "Combat Data",
      url: "/data-export",
      icon: BarChart3,
      items: [
        {
          title: "Export Data",
          url: "/data-export",
        },
        {
          title: "Statistics",
          url: "/dashboard",
        },
        {
          title: "Battle Reports",
          url: "/dashboard",
        },
        {
          title: "Comparisons",
          url: "/virtualized-table",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/",
      icon: FileText,
      items: [
        {
          title: "Getting Started",
          url: "/",
        },
        {
          title: "Radar Guide",
          url: "/",
        },
        {
          title: "Sensor Mechanics",
          url: "/",
        },
        {
          title: "API Reference",
          url: "/",
        },
      ],
    },
    {
      title: "Settings",
      url: "/",
      icon: Settings2,
      items: [
        {
          title: "Display Options",
          url: "/",
        },
        {
          title: "Data Preferences",
          url: "/",
        },
        {
          title: "API Configuration",
          url: "/",
        },
        {
          title: "About",
          url: "/",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Target Acquisition",
      url: "/",
      icon: Crosshair,
    },
    {
      name: "Electronic Warfare",
      url: "/",
      icon: Radio,
    },
    {
      name: "Tactical Systems",
      url: "/",
      icon: Zap,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
