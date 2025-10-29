"use client";

import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import NavItem, { NavItemSkeleton } from "./nav-item";

const Navigation = () => {
    const pathname = usePathname();
    const user = useUser();

    const routes = [
        {
            label: "Stream",
            href: `/u/${user.user?.username}`,
            icon: Fullscreen
        },
        {
            label: "keys",
            href: `/u/${user.user?.username}/keys`,
            icon: KeyRound
        },
        {
            label: "Chat",
            href: `/u/${user.user?.username}/chat`,
            icon: MessageSquare
        },
        {
            label: "Community",
            href: `/u/${user.user?.username}/community`,
            icon: Users
        }
    ];

    if (!user.user?.username) {
        return (
            <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        )
    }

    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => (
                <div key={route.href}>
                    <NavItem key={route.href} label={route.label} icon={route.icon} href={route.href} isActive={pathname === route.href} />
                </div>
            ))}
        </ul>
    )
}

export default Navigation;