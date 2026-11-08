
'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
    LayoutDashboard,
    Briefcase,
    Bookmark,
    FileText,
    CreditCard,
    Settings,
    Users,
    Building2,
} from "lucide-react";
import type { IUser } from "@/types/userTypes";
import { SkeletonLoading } from "./SkeletonLoading";


type Role = IUser["role"];

interface IMenuItem {
    id: string;
    name: string;
    url: string;
    icon: LucideIcon;
}

const menuItemsByRole: Record<Role, IMenuItem[]> = {
    seeker: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { id: "jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
        { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
        { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
        { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
        { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    recruiter: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
        { id: "add-job", name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: Briefcase },
        { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
        { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
    ],
    admin: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
        { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
        { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
        { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
        { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ]
}


const DashboardSideBar = () => {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    const role = user?.role as Role | undefined
    console.log({ isPending, user, role })

    if (isPending) {
        return <SkeletonLoading />
    }
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {
                            role ? menuItemsByRole[role].map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton render={<Link href={item.url} />}>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            )) :
                                <div className="px-3 text-sm text-muted-foreground">
                                    Choose your role to see your menu.
                                </div>
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default DashboardSideBar;
