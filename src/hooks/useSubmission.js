import { saveSubmission } from "@/api/submission";
import { getUserProfile } from "@/api/userApi";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useSubmission = () => {
    // set users
    const saveUserSubmission = useMutation({
        mutationFn: saveSubmission
    });

    return {
        saveUserSubmission
    }
}