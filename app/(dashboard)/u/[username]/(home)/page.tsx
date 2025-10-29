import StreamPlayer from "@/components/stream-player/video-player";
import { getUserByUsername } from "@/modules/browse/actions";
import { currentUser } from "@clerk/nextjs/server";


interface DashboardPageProps {
  params: Promise<({
    username: string
  })>
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const { username } = await params;

  const externalUser = await currentUser();
  const { user } = await getUserByUsername(username);

  if (!user || user.clerkId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorised!");
  }
  return (
    <div className='h-full'>
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  )
}

export default DashboardPage;