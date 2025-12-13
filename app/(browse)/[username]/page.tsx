import StreamPlayer from "@/components/stream-player/video-player";
import { getUserByUsername, isBlockedByUser, isFollowingUser } from "@/modules/browse/actions";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const { user } = await getUserByUsername(username);

  // console.log(user)

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user?.id);
  const isBlockedUser = await isBlockedByUser(user?.id);

  if (isBlockedUser) {
    notFound();
  }

  // console.log(isFollowing, isBlockedUser)

  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing.success}
    />
  )
}

export default UserPage;