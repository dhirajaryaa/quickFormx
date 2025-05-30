import { Button } from '@/components/ui/button'
import { FilePlus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { formModalSchema } from "@/schema/formModal.js"
import { zodResolver } from '@hookform/resolvers/zod';
import useStore from '@/store';
import { useNavigate } from 'react-router';

function CreateFormModal() {
    const navigate = useNavigate()
    const { setCreateFormData } = useStore();
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: zodResolver(formModalSchema)
    });
    function createFormHandler(input) {
        setCreateFormData({...input,fields:[]});
        // clear form
        reset();
        // navigate
        navigate("/forms/create")
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"h-35 sm:h-auto sm:min-h-45 border border-dashed flex flex-col bg-accent/50 shadow hover:shadow-md text-foreground/70 transition-all duration-200 cursor-pointer"} variant='ghost' >
                    <FilePlus className='size-5 sm:size-7' />
                    <span className='font-bold text-sm sm:text-xl '>Create New Form</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Form</DialogTitle>
                    <DialogDescription>
                        Fill out the details below to create a new form.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex items-center space-x-2" onSubmit={handleSubmit(createFormHandler)}>
                    <div className="grid flex-1 gap-3">
                        {/* title  */}
                        <div className='grid gap-2'>
                            <Label htmlFor="title" >
                                Title
                            </Label>
                            <Input
                                id="title"
                                {...register("title")}
                                placeholder="Enter Form Title"
                                aria-invalid={errors.title ? "true" : "false"}
                            />
                            {
                                errors.title && <span className='text-destructive text-xs'>{errors.title.message}</span>
                            }
                        </div>
                        {/* description */}
                        <div className='grid gap-2'>
                            <Label htmlFor="description" >
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                className={'resize-none'}
                                placeholder="Enter Form Description"
                                aria-invalid={errors.description ? "true" : "false"}
                            />
                            {
                                errors.description && <span className='text-destructive text-xs'>{errors.description.message}</span>
                            }
                        </div>
                        <Button>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>


    )
}

export default CreateFormModal
