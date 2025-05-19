import { loginUser, registerUser } from "@/api/authApi"
import { useMutation } from "@tanstack/react-query"

export const useAuth = () => {
    const loginHandler = useMutation({
        mutationFn: loginUser
    })
    const registerHandler = useMutation({
        mutationFn: registerUser
    })
    return {
        loginHandler,
        registerHandler
    }
}
