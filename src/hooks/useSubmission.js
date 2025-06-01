import { getAllSubmissions, saveSubmission } from "@/api/submission";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useSubmission = () => {
    // save submission
    const saveUserSubmission = useMutation({
        mutationFn: saveSubmission
    });
    // get all submissions
    const getSubmissions = useQuery({
        queryKey: ['submissions'],
        queryFn: getAllSubmissions
    });

    return {
        saveUserSubmission,
        getSubmissions
    }
}