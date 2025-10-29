"use client";

import { User } from '@prisma/client'
import { useSidebarStore } from '../store';
import UserItem, { UserItemSkeleton } from './user-item';

interface RecommendedProps {
    data: (User & {
        stream: { isLive: boolean } | null;
    })[];
}

const Recommended = ({ data }: RecommendedProps) => {
    const { collapsed } = useSidebarStore();
    const showLabel = !collapsed && data?.length > 0;

    console.log(data)
    return (
        <div>
            {showLabel && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Recommended
                    </p>
                </div>
            )}

            <ul className='space-y-2 px-2'>
                {data?.map((user) => (
                    <UserItem key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isLive={user.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}

export const RecommendedSkeleton = () => {
    return (
        <ul className='px-2'>
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}

export default Recommended