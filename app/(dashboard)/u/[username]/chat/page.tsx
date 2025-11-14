"use client";

import { currentDbUser } from '@/modules/auth/actions';
import { getStreamByUserId } from '@/modules/dashboard/actions';
import ToggleCard from '@/modules/dashboard/components/toggle-cards';
import { useGetStreamByUserId } from '@/modules/dashboard/hooks/dashboard';

const ChatPage = () => {
    const { data: stream, isPending: isStreamLoading } = useGetStreamByUserId();

    if (isStreamLoading) return <div>Loading...</div>;

    if (!stream) return <div>No stream found!</div>;
    
    return (
        <div className='p-6'>
            <div className='mb-4'>
                <h1 className='text-2xl font-bold'>
                    Chat Settings
                </h1>
            </div>

            <div className='space-y-4'>
                <ToggleCard
                    field="isChatEnabled"
                    label="Enable Chat"
                    value={stream.isChatEnabled}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="Delay Chat"
                    value={stream.isChatDelayed}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Must be following to chat"
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}

export default ChatPage;