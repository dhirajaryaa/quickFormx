import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { ArrowUpCircleIcon } from 'lucide-react'
import React from 'react'
import { Logo, LogoutBtn } from '..'
import NavItems from './NavItems'

function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                {/* app logo  */}
                            <Logo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* links  */}
                <NavItems />
            </SidebarContent>
            <SidebarFooter>
                {/* logout btn  */}
                <LogoutBtn />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
