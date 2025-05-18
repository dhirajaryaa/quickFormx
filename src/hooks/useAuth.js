import { loginUser } from "@/api/authApi"
import { useMutation } from "@tanstack/react-query"

export const useAuth = ()=>{
    const loginHandler = useMutation({
   mutationFn: loginUser
    })
    return {
        loginHandler
    }
}
