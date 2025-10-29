import { StreamPlayerSkeleton } from '@/components/stream-player/video-player';

const Loading = () => {
    return (
        <div className='h-full'>
            <StreamPlayerSkeleton />
        </div>
    )
}

export default Loading;