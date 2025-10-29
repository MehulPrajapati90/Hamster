"use client"

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/user-avatar";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import UnBlockButton from "./unblock-button";

export type BlockedUser = {
    userId: string;
    imageUrl: string;
    username: string;
    createdAt: string;
}

export const columns: ColumnDef<BlockedUser>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => (
            <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Username
                <ArrowUpDown className="ml-2 h-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-x-4">
                <UserAvatar
                    username={row.original.username}
                    imageUrl={row.original.imageUrl}
                />
                <span>{row.original.username}</span>
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Blocked date
                <ArrowUpDown className="ml-2 h-4" />
            </Button>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <UnBlockButton userId={row.original.userId} />
    },
];