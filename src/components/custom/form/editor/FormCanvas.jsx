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
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { formModalSchema } from "@/schema/formModal";
import { useEffect } from "react";


function FormCanvas({ allElements, formId, isDraft }) {
    const navigate = useNavigate();
    const [activeElement, setActiveElement] = useState(null);
    const { createNewForm: { mutateAsync }, getAllForm: { refetch }, updateForm: { mutateAsync: updateMutate } } = useFormHook();
    const { isPreview, createForm, setForms, inEditMode, setInEditMode, setCreateFormData } = useStore();
    // form hook
    const { register,
        handleSubmit,
        control, reset, formState: { errors }, setError, clearErrors } = useForm({
            defaultValues: {
                "title": createForm.title || "",
                "description": createForm.description || "",
                "authUser": false,
                "isDraft": isDraft || true,
                "fields": createForm.fields || []
            },
            resolver: zodResolver(formModalSchema)
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

    useEffect(() => {
        !inEditMode && setInEditMode(false);
        !inEditMode && setCreateFormData({ fields: [] });

    }, [inEditMode]);

    async function handleSubmitForm(input) {
    if (fields.length === 0) {
        setError("root", {
            type: "manual",
            message: "Add at least one field to continue.",
        });
        return;
    }

    clearErrors("root");

    const updatedFields = fields.map((field) => ({
        ...field,
        name: `${field.label.split(" ")[0].toLowerCase()}_${Date.now()}`
    }));

    let response;

    try {
        if (!inEditMode) {
            response = await mutateAsync({ ...input, fields: updatedFields, isDraft });

            if (response.statusCode >= 400) {
                toast.error(response.message || "Something went wrong while saving.");
                return;
            }

            toast.success(
                isDraft
                    ? "Draft saved! 💾 Keep going — you’re doing great! 💪"
                    : "Published! 🎉 Your form is now live — awesome job! 🚀"
            );
        } else {
            // Edit mode: update existing form
            response = await updateMutate({id:createForm._id,data:{ ...input, fields: updatedFields }});

            if (response?.statusCode >= 400) {
                toast.error(response.message || "Failed to update the form.");
                return;
            }

            toast.success("Form updated successfully! ✅ Your changes are saved.");
        }

        reset();
        const refetched = await refetch();
        setForms(refetched?.data?.data);
        navigate("/forms");

    } catch (err) {
        toast.error("Unexpected error occurred. Please try again.");
        console.error(err);
    }
}


    return (
        <section className={`bg-muted p-2 rounded-lg shadow-lg h-full flex-1 ${isPreview ? "sm:max-w-2xl" : "w-full"}`}>
            <ScrollArea className="h-[84vh]">
                <form id={formId} onSubmit={handleSubmit(handleSubmitForm)} className="grid gap-2" >
                    {
                        errors.root && <div className='text-destructive text-xs sm:text-sm font-medium bg-destructive/10 backdrop-blur-xl border border-destructive/20 py-2 px-4 rounded-lg'>{errors.root.message}</div>
                    }
                    {/* for title  */}
                    <div className="grid gap-2 bg-background p-4 rounded-lg border">
                        <Label htmlFor="title" className={'ml-1'}>Title <span className="text-destructive">*</span></Label>
                        <Input
                            id="title"
                            className={"font-semibold text-sm"}
                            placeholder="Enter Form Title here"
                            {...register("title")}
                            aria-invalid={errors.title ? "true" : "false"}
                        />
                        {
                            errors.title && <span className='text-destructive text-xs'>{errors.title.message}</span>
                        }
                    </div>
                    {/* for description  */}
                    <div className="grid gap-2 bg-background p-4 rounded-lg border">
                        <Label htmlFor="description" className={'ml-1'}>Description</Label>
                        <Textarea
                            id="description"
                            className={"h-19 resize-none text-sm"}
                            {...register("description")}
                            placeholder="Enter Form Description here"
                            aria-invalid={errors.description ? "true" : "false"}
                        />
                        {
                            errors.description && <span className='text-destructive text-xs'>{errors.description.message}</span>
                        }
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
                                    register={register}
                                    control={control}
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
