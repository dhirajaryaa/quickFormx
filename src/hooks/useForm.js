import { createForm, getForms, getOneForm } from "@/api/formApi"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useForm = (id) => {
    // get form
    const getForm = useQuery({
        queryKey: ["forms",id],
        queryFn: ()=>getOneForm(id),
        enabled:!!id
    });
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
        getForm,
        createNewForm
    }
}
