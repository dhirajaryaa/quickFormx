import { useDndMonitor, useDroppable } from "@dnd-kit/core"
import useStore from "@/store"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectedField from "./SelectedField";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertiesEditor from "./PropertiesEditor";
import { useState } from "react";
import { useForm as useFormHook } from "@/hooks/useForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function FormCanvas({ allElements, formId,isDraft }) {
    const navigate = useNavigate();
    const [activeElement, setActiveElement] = useState(null);
    const { createNewForm: { mutateAsync, isPending }, getAllForm: { refetch } } = useFormHook()
    const { isPreview, createForm, setForms, inEditMode } = useStore();
    // form hook
    const { register,
        handleSubmit,
        control, reset } = useForm({
            defaultValues: {
                "title": createForm.title || "",
                "description": createForm.description || "",
                "authUser": false,
                "isDraft": isDraft ||true,
                "fields": createForm.fields || []
            }
        });
    // use filed array to dynamic fields
    const { fields, append, remove, move, update } = useFieldArray({
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
                    required: true,
                    options: []
                }
                if (newInputType) {
                    append(newInput);
                }
            }

        }
    });

    // dnd
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas'
    });

    async function handleSubmitForm(input) {
        const updatedFields = input.fields.map((field) => ({ ...field, name: `${field.label.split(" ")[0].toLowerCase()}_${Date.now()}` }));
        let res
        if(!inEditMode){
            res = await mutateAsync({ ...input, fields: updatedFields,isDraft });
        }
        if (res.statusCode >= 400) { // error
            toast.error(res.message);
        } else { // success
            const res = await refetch()
            setForms(res?.data?.data);
            reset()
            navigate("/forms");
        }
    }

    return (
        <section className={`bg-muted p-2 rounded-lg shadow-lg h-full flex-1 ${isPreview ? "sm:max-w-2xl" : "w-full"}`}>
            <ScrollArea className="h-[84vh]">
                <form id={formId} onSubmit={handleSubmit(handleSubmitForm)} className="grid gap-2" >
                    {/* for title  */}
                    <div className="grid gap-2 bg-background p-4 rounded-lg border">
                        <Label htmlFor="title" className={'ml-1'}>Title <span className="text-destructive">*</span></Label>
                        <Input
                            id="title"
                            className={"font-semibold text-sm"}
                            placeholder="Enter Form Title here"
                            {...register("title")}
                        />
                    </div>
                    {/* for description  */}
                    <div className="grid gap-2 bg-background p-4 rounded-lg border">
                        <Label htmlFor="description" className={'ml-1'}>Description</Label>
                        <Textarea
                            id="description"
                            className={"h-19 resize-none text-sm"}
                            {...register("description")}
                            placeholder="Enter Form Description here"
                        />
                    </div>
                    {/* for dnd fields  */}
                    <div className="w-full grid gap-2 min-h-18 " ref={setNodeRef}>
                        {
                            fields?.map((field, index) =>
                                <SelectedField
                                    key={field.id}
                                    field={field}
                                    remove={remove}
                                    index={index}
                                    move={move}
                                    isPreview={isPreview}
                                    setActiveElement={setActiveElement}
                                />
                            )
                        }
                        {
                            isOver && <div className="bg-gradient-to-b from-background to-gray-300 w-full h-18 border font-semibold bg-to rounded-lg flex items-center justify-center">Drop here</div>
                        }
                    </div>
                </form>
            </ScrollArea>
            {/* for PropertiesEditor  */}
            <PropertiesEditor
                activeElement={activeElement}
                update={update}
                setActiveElement={setActiveElement}
            />
        </section>
    )
}

export default FormCanvas
