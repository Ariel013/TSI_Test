import { Boxes, LayoutDashboard, UserCircle } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DashboardLayout({ children }) {
    const route = useLocation();

    return (
        <div className="w-full flex h-screen bg-blue-50">
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard size={20} />} active={route.pathname.includes("dashboard")} text="Dashboard" />
                <SidebarItem icon={<UserCircle size={20} />} active={route.pathname.includes("users")} text="Users" />
                <SidebarItem icon={<UserCircle size={20} />} active={route.pathname.includes("players")} text="Players" />
                <SidebarItem icon={<Boxes size={20} />} active={route.pathname.includes("games")} text="Games" />
            </Sidebar>

            {children}
        </div>
    )
}