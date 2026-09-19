import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LogoutButton from "./LogoutButton";

export function AppSidebar() {
  const { url } = usePage();

  return (
    <Sidebar >
      <SidebarHeader>
        <div className="flex items-center px-4 py-4">
          <h1 className="text-lg font-semibold">
            ManageMem
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>

            <SidebarMenu className='space-y-1'>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  isActive={url === "/"}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/members" />}
                  isActive={url.startsWith("/members")}
                >
                  <Users />
                  <span>Members</span>
                </SidebarMenuButton>
              </SidebarMenuItem>



            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>


        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link href="/settings" />}
            isActive={url.startsWith("/settings")}
          >
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <LogoutButton />
        </SidebarMenuItem>

      </SidebarFooter>
    </Sidebar>
  );
}
