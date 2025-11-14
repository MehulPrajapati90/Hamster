import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStreamByUserId, getStreamOfUser, updateStream, updateUser } from "../actions";
import { createIngress } from "@/actions/ingress";
import { IngressInput } from "livekit-server-sdk";
import { Stream, User } from "@prisma/client";
import { getUserByUsername } from "@/modules/browse/actions";

export const useGetStreamByUserId = () => {
    return useQuery({
        queryKey: ['stream'],
        queryFn: async () => await getStreamOfUser()
    })
}

export const useCreateIngress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (type: IngressInput) => await createIngress(type),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stream'] })
        }
    })
}

export const useUpdateStream = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: Partial<Stream>) => await updateStream(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stream'] })
        }
    })
}

export const useGetUserByUsername = (username: string) => {
    return useQuery({
        queryKey: ['stream', 'user'],
        queryFn: async () => await getUserByUsername(username)
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: Partial<User>) => updateUser(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stream'] })
        }
    })
}