import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatDate"
import useStore from "@/store"
import { Trash2Icon } from "lucide-react"
import { Edit, View, Send } from "lucide-react"
import { useNavigate } from "react-router"
import { FormDelete } from ".."
import { useForm } from "@/hooks/useForm"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

function FormCard({ form }) {
    const navigate = useNavigate();
    const { setInEditMode, setCreateFormData,setForms } = useStore()
    const { deleteForm: { mutateAsync, isPending },getAllForm:{refetch} } = useForm();
    // for edit 
    const handleEditMode = () => {
        setInEditMode(true);
        setCreateFormData(form)
        navigate(`/forms/${form._id}/edit`)
    }
    // for delete 


    const handleDelete = async () => {
        // console.log("clicked");
        const response = await mutateAsync(form._id);
        if (response?.statusCode >= 400) {
            toast.error(response.message || "Failed to delete the form.");
            return;
        };
        const refetched = await refetch();
        setForms(refetched?.data?.data);
        
        toast.success("Form Delete 🗑️ successfully! ");


    }

    return (
        <Card className="bg-muted/50  shadow hover:shadow-md transition-all duration-200 py-4 cursor-pointer">
            <CardHeader className={"gap-0"}>
                <CardTitle className="flex items-center justify-between">
                    <span className="font-semibold line-clamp-1">{form.title}</span>
                    {form.isDraft ? <Badge className='bg-yellow-200 dark:bg-yellow-400 text-yellow-900 dark:text-white'>Draft</Badge> : <Badge className={'bg-green-200 dark:bg-green-400 text-green-900 dark:text-white'}>Public </Badge>}
                </CardTitle>
                <CardDescription className={'flex gap-2 text-xs items-center justify-between text-foreground/60 font-medium pt-2'}>
                    <p>{formatDate(form.updatedAt)}</p>
                    <p className="flex gap-2">
                        <span className="flex gap-1 text-xs">
                            <View className="size-4" /> 2
                        </span>
                        <span className="flex gap-1 text-xs">
                            <Send className="size-4" /> 8
                        </span>
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent className={"line-clamp-2 text-xs sm:text-sm min-h-8 sm:min-h-10"}>
                {form.description}
            </CardContent>
            <CardFooter className={'py-0 flex items-center gap-2'}>
                <Button className={'flex-1'} onClick={handleEditMode}>
                    <Edit /> <span>Edit Form</span>
                </Button>
                <FormDelete handleDelete={handleDelete}>
                    <Button size={'icon'} variant={'destructive'} disabled={isPending}>
                        {
                            isPending ? <Loader2 className="animate-spin" /> :
                                <Trash2Icon />
                        }
                    </Button>
                </FormDelete>
            </CardFooter>

        </Card>
    )
}

export default FormCard
