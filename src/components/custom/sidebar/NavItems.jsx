import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Layers, Send, BarChartIcon, PlusCircleIcon, Grid2X2 } from "lucide-react"
import { Link } from "react-router";
import { useLocation } from "react-router"

function NavItems() {
    const { pathname } = useLocation();

    const mainMenu = [
        {
            name: "Dashboard",
            icon: <Grid2X2 />,
            href: "/dashboard"
        },
        {
            name: "Forms",
            icon: <Layers />,
            href: "/forms"
        },
        {
            name: "Submission",
            icon: <Send />,
            href: "/submission"
        },
        {
            name: "Analytics",
            icon: <BarChartIcon />,
            href: "/analytics",
        },
    ]

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2 mt-3">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton asChild
                            tooltip="Quick Create"
                            className="bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/80 hover:text-primary-foreground active:bg-primary/80 active:text-primary-foreground"
                        >
                            <Button >
                                <PlusCircleIcon />
                                <span>Quick Create</span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu className={'mt-3'}>
                    {mainMenu.map((link) => (
                        <SidebarMenuItem key={link.name} className={'mt-1'}>
                            <Link to={link.href}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={link.name}
                                    className="py-5 font-medium text-base flex items-center gap-3 justify-start"
                                    isActive={pathname.startsWith(link.href)}
                                >
                                    <span>
                                        <span>
                                            {link.icon}
                                        </span>
                                        {link.name}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default NavItems
