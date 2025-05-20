import { getForms } from "@/api/formApi"
import { useQuery } from "@tanstack/react-query"

export const useForm = () => {
    // get all form
    const getAllForm = useQuery({
        queryKey: ["forms"],
        queryFn: getForms
    });

    return {
        getAllForm
    }
}
