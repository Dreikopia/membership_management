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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoutButton from "./LogoutButton";

export function AppSidebar() {
  const { url } = usePage();

  // useSidebar() reads the sidebar's own internal state.
  // state will be either "expanded" or "collapsed" — we use that
  // to decide what to show in the header (full title vs. small mark).
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (

    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={
            isCollapsed
              ? "flex items-center justify-center py-4"
              : "flex items-center justify-between px-4 py-4"
          }
        >
          {!isCollapsed && (
            <h1 className="text-lg font-semibold">
              ManageMem
            </h1>
          )}

          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  isActive={url === "/"}
                  tooltip="Dashboard"
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/members" />}
                  isActive={url.startsWith("/members")}
                  tooltip="Members"
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
            tooltip="Settings"
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