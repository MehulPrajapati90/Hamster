import { useQuery, useQueryClient } from "@tanstack/react-query";
import { currentDbUser } from "../actions";

export const useCurrentDbUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async() => await currentDbUser()
    })
}