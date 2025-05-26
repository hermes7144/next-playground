import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "로그인!!",
    url: "/auth/signin",
    icon: Inbox,
  },
  {
    title: "BAA002 바로가기",
    url: "/ENTN/A/BAA002",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
    // <aside className="w-64 bg-gray-800 text-white p-6">
    //     <button
    //       className="btn btn-sm btn-ghost mb-6"
    //       onClick={onClose}
    //     >
    //       닫기
    //     </button>
    //     <nav>
    //       <ul className="space-y-4">
    //         <li>
    //     <Link
    //       href="/ENTN/A/BAA002"
    //       className="hover:text-primary"
    //     >
    //       BAA002 바로가기
    //     </Link>

    //         </li>
    //         <li>
    //     <Link
    //       href="/auth/signin"
    //       className="hover:text-primary"
    //     >
    //       로그인
    //     </Link>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:text-primary">
    //             메뉴3
    //           </a>
    //         </li>
    //       </ul>
    //     </nav>
    //   </aside>
