import { getUserProfile } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query"

export const useUser = (enabled) => {
    // get users
    const getProfile = useQuery({
        queryKey: ['user'],
        queryFn: getUserProfile,
        enabled
    });

    return {
        getProfile
    }
}
