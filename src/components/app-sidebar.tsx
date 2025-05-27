import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"

import { ChevronDownIcon } from "lucide-react"

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
    
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible-lvl1">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild className="flex justify-between items-center w-full">
                      <Link href="#">
                        <Home></Home>
                        <span>home</span>
                        <ChevronDownIcon className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-lvl1:rotate-180" />
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* 'home' 메뉴 하위 (2단계) */}
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Collapsible defaultOpen className="group/collapsible-lvl2">
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between w-full">
                              <SidebarMenuButton asChild className="flex-grow">
                                <Link href="#" >
                                  <Inbox></Inbox>
                                  <span>로그인</span>
                                  <ChevronDownIcon className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-lvl2:rotate-180" />
                                </Link>
                              </SidebarMenuButton>
                            </div>
                          </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                  <SidebarMenuSubItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/ENTN/A/BAA002">
                                          <span>BAA002 바로가기</span>
                                        </Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/auth/signin"> 
                            <span>로그인</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>24</SidebarMenuBadge>
                      </SidebarMenuSubItem>

                      {/* 'baa003' 하위 메뉴 항목 */}
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/ENTN/A/BAA002">
                            <span>BAA002 바로가기</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild className="flex justify-between items-center w-full">
                      <Link href="#">
                        <Home></Home>
                        <span>home</span>
                        <ChevronDownIcon className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* 'home' 메뉴 하위 (2단계) */}
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <Link href="/auth/signin"> 
                            <span>로그인</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>24</SidebarMenuBadge>
                      </SidebarMenuSubItem>

                      {/* 'baa003' 하위 메뉴 항목 */}
                      <SidebarMenuSubItem>
                         <SidebarMenuButton asChild>
                          <Link href="/ENTN/A/BAA002">
                            <span>BAA002 바로가기</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* 다른 1단계 메뉴 항목들이 있다면 여기에 추가하세요 */}
              {/* 예시:
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                   <a href="/dashboard">
                     // <DashboardIcon className="h-5 w-5 mr-2" />
                     <span>Dashboard</span>
                   </a>
                 </SidebarMenuButton>
              </SidebarMenuItem>
              */}
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
// side = left / right -> 사이드바 위치
// variant = sidebar / floating / inset -> 사이드바, 둥근사각형, ??
// collapsible = icon / offcanvas / none -> 사이드메뉴 닫히면 아이콘만 보이기 / 완전히 안 보이기, 안 닫히기
