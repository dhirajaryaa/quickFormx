import { AppSidebar, SiteHeader } from "@/components/custom"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

function LayoutProvider({children}) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        {/* header  */}
        <SiteHeader />
        {/* main body  */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutProvider
