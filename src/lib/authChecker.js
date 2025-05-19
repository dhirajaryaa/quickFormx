import { getUserProfile } from "@/api/userApi";
import useStore from "@/store";

export const getAuthUser = async () => {
    const { user, removeUser, setUser, isAuthenticated } = useStore.getState()
    if (!isAuthenticated) {
        try {
            const { data } = await getUserProfile();
            if (data) {
                setUser(data);
                return user;
            } else {
                removeUser();
                return null;
            }
        } catch (error) {
            removeUser();
            return null;
        }
    }

}
