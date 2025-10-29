import { currentDbUser } from '@/modules/auth/actions';
import { getStreamByUserId } from '@/modules/dashboard/actions';
import ConnectModal from '@/modules/dashboard/components/connect-modal';
import KeyCards from '@/modules/dashboard/components/keycards';
import UrlCards from '@/modules/dashboard/components/url-cards';

const KeysPage = async () => {
    const self = await currentDbUser();
    const stream = await getStreamByUserId(self?.user?.id || '')

    if (!stream) {
        throw new Error("Stream not found!");
    }

    return (
        <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl font-bold'>
                    Keys & Urls
                </h1>

                <ConnectModal />
            </div>
            <div className='space-y-4'>
                <UrlCards value={stream.serverUrl || ''} />
                <KeyCards value={stream.streamKey || ''} />
            </div>
        </div>
    )
}

export default KeysPage;