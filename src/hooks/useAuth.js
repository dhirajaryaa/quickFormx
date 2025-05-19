import { loginUser, logoutUser, registerUser } from "@/api/authApi"
import { useMutation } from "@tanstack/react-query"

export const useAuth = () => {
    const loginHandler = useMutation({
        mutationFn: loginUser
    })
    const registerHandler = useMutation({
        mutationFn: registerUser
    })
    const logoutHandler = useMutation({
        mutationFn: logoutUser
    })
    return {
        loginHandler,
        registerHandler,
        logoutHandler
    }
}
