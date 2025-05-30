import { saveSubmission } from "@/api/submission";
import { useMutation} from "@tanstack/react-query"

export const useSubmission = () => {
    // set users
    const saveUserSubmission = useMutation({
        mutationFn: saveSubmission
    });

    return {
        saveUserSubmission
    }
}