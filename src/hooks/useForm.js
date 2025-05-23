import { createForm, getForms } from "@/api/formApi"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useForm = () => {
    // get all form
    const getAllForm = useQuery({
        queryKey: ["forms"],
        queryFn: getForms
    });
    // create form
    const createNewForm = useMutation({
        mutationFn: createForm
    })

    return {
        getAllForm,
        createNewForm
    }
}
