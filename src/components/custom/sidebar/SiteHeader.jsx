import { SidebarTrigger } from "@/components/ui/sidebar"
import UserAvatar from "./UserAvatar"
import { Separator } from "@/components/ui/separator"

function SiteHeader() {
    return (
        <header className='flex items-center justify-between px-4 bg-muted/30 h-14 shadow border-b'>
            <div className="flex items-center gap-2">
                <SidebarTrigger className="" />
                <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-6"
                />
                {/* breadcrumb   */}
                Dashboard
            </div>
            {/* user avatar  */}
            <UserAvatar />
        </header>
    )
}

export default SiteHeader
