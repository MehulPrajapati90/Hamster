"use client";

import { useCurrentDbUser } from '@/modules/auth/hooks/auth';
import ConnectModal from '@/modules/dashboard/components/connect-modal';
import KeyCards from '@/modules/dashboard/components/keycards';
import UrlCards from '@/modules/dashboard/components/url-cards';
import { useGetStreamByUserId } from '@/modules/dashboard/hooks/dashboard';

const KeysPage = () => {
    const { data: stream, isPending: isStreamLoading } = useGetStreamByUserId();

    if (isStreamLoading) return <div>Loading...</div>;

    if (!stream) return <div>No stream found!</div>;

    return (
        <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-xl md:text-2xl font-bold'>Keys & Urls</h1>
                <ConnectModal />
            </div>

            <div className='space-y-4'>
                <UrlCards value={stream.serverUrl || ''} />
                <KeyCards value={stream.streamKey || ''} />
            </div>
        </div>
    );
};

export default KeysPage;