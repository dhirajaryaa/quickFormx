import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import useStore from "@/store"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import SelectedField from "./SelectedField";
import { ScrollArea } from "@/components/ui/scroll-area";

function FormCanvas({ allElements }) {
    const { createForm } = useStore();
    // form hook
    const { register, formState: { errors }, handleSubmit, control } = useForm({
        defaultValues: {
            "title": createForm.title || "",
            "description": createForm.description || "",
            "authUser": false,
            "isDraft": true,
            "fields": []
        }

    });
    // use filed array to dynamic fields
    const { fields, append, remove } = useFieldArray({
        control,
        name: "fields"
    });
    // update form fields
    useDndMonitor({
        onDragEnd(event) {
            const { active, over } = event;
            if (over && over.id === "canvas") {
                const newInputType = allElements.find(el => el.type === active.id);
                const newInput = {
                    id: Date.now(),
                    type: active.id,
                    label: active.id,
                    placeholder: "value here...",
                    required: true
                }
                if (newInputType) {
                    append(newInput);
                    //     ...prev,
                    //     {
                    //         id: Date.now(),
                    //         type: active.id,
                    //         label: `${active.id}`,
                    //         placeholder: "value here...",
                    //         required: true
                    //     }
                    // ]);
                }
            }

        }
    })

    // dnd
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas',
        data: {
            isCanvas: true
        }
    });

    return (
        <section className='bg-muted border p-3 col-span-3 rounded-lg shadow-lg h-full'>
            <ScrollArea className="h-[84vh]">
                <form onSubmit={handleSubmit} className="grid gap-2" >
                    {/* heading  */}
                    <h2 className="text-xl font-semibold text-center ">Drag and Drop Here</h2>
                    <Separator />
                    {/* for title  */}
                    <div className="grid gap-2 bg-background p-4 rounded-lg border">
                        <Label htmlFor="title" className={'ml-1'}>Title <span className="text-destructive">*</span></Label>
                        <Input
                            id="title"
                            className={"font-semibold bg-background"}
                            {...register("title")}
                        />
                    </div>
                    {/* for description  */}
                    <div className="grid gap-2 bg-background p-4 rounded-lg border">
                        <Label htmlFor="description" className={'ml-1'}>Description</Label>
                        <Textarea
                            id="description"
                            className={"h-19 resize-none"}
                            {...register("description")}
                        />
                    </div>
                    {/* for dnd fields  */}
                    <div className="w-full grid gap-2 min-h-8" ref={setNodeRef}>
                        {
                            fields?.map((field) =>
                                <SelectedField key={field.id} field={field} />
                            )
                        }
                        {
                            isOver && <div className="bg-gradient-to-b from-background to-gray-300 w-full h-18 border font-semibold bg-to rounded-lg flex items-center justify-center">Drop here</div>
                        }
                    </div>
                </form>
            </ScrollArea>
        </section>
    )
}

export default FormCanvas
