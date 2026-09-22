import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                {children}
            </main>
        </SidebarProvider>
    );
}