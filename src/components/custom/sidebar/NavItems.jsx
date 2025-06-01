import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Layers, Send, BarChartIcon, PlusCircleIcon, Grid2X2 } from "lucide-react"
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useLocation } from "react-router"

function NavItems() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

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
            href: "/submissions"
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
                        <SidebarMenuButton
                            onClick={() => navigate("/forms/create")}
                            tooltip="Quick Create"
                            variant="primary"
                            className="bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/80 hover:text-primary-foreground active:bg-primary/80 active:text-primary-foreground flex items-center justify-center"
                        >
                            <PlusCircleIcon />
                            <span>Quick Create</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu className={'mt-3'}>
                    {mainMenu.map((link) => (
                        <SidebarMenuItem key={link.name}>
                            <Link to={link.href}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={link.name}
                                    isActive={pathname.startsWith(link.href)}
                                    className={"text-sidebar-accent-foreground/80"}
                                >
                                    <span className="py-6 flex gap-4 text-[15px] px-3">
                                        {link.icon}
                                        {link.name}
                                    </span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup >
    )
}

export default NavItems
