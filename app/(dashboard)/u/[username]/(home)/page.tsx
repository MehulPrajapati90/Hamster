"use client";

import StreamPlayer from "@/components/stream-player/video-player";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useGetUserByUsername } from "@/modules/dashboard/hooks/dashboard";

const DashboardPage = () => {
  const params = useParams();
  const username = params?.username as string;
  const { user: externalUser, isLoaded } = useUser();

  const {
    data,
    isLoading,
    isError,
  } = useGetUserByUsername(username);

  useEffect(() => {
    if (isError) console.error("Error fetching user data");
  }, [isError]);

  if (!isLoaded || isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading...</div>;
  }

  const user = data?.user;

  if (!user || user.clerkId !== externalUser?.id || !user.stream) {
    return (
      <div className="text-red-500 text-center mt-10">
        Unauthorized or stream not found.
      </div>
    );
  }

  return (
    <div className="h-screen">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default DashboardPage;
