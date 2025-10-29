import { StreamPlayerSkeleton } from '@/components/stream-player/video-player';

const DashboardLoading = () => {
    return (
        <div className='h-full'>
            <StreamPlayerSkeleton />
        </div>
    )
}

export default DashboardLoading;