import { AppSidebar, SiteHeader } from "@/components/custom"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

function LayoutProvider() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        {/* header  */}
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          body
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutProvider
