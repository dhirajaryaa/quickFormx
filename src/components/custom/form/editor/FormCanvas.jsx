import { closestCorners, DndContext, useDroppable } from "@dnd-kit/core"
import useStore from "@/store"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SortableContext } from "@dnd-kit/sortable";
import SelectedField from "./SelectedField";

function FormCanvas({ elements }) {
    const { createForm } = useStore();
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            "title": "Order Product",
            "description": "Fill the form to order a product",
            "authUser": false,
            "isDraft": true,
            "fields": [
                {
                    "label": "Customer Name",
                    "name": "customerName",
                    "type": "text"
                },
                {
                    "label": "Shipping Address",
                    "name": "address",
                    "type": "textarea"
                },
                {
                    "label": "Choose Product",
                    "name": "product",
                    "type": "select",
                    "options": [
                        { "value": "T-Shirt" },
                        { "value": "Mug" },
                        { "value": "Notebook" }
                    ]
                },
                {
                    "label": "Quantity",
                    "name": "quantity",
                    "type": "number"
                }
            ]
        }

    });

    // dnd
    const { setNodeRef } = useDroppable({ id: "canvas" })
    return (
        <section className='bg-muted border p-3 col-span-3 rounded-lg shadow-lg h-full'>
            <form onSubmit={handleSubmit} className="grid gap-3" ref={setNodeRef}>
                {/* heading  */}
                <h2 className="text-xl font-semibold text-center ">Drag and Drop Here</h2>
                <Separator />
                {/* for title  */}
                <div className="grid gap-2">
                    <Label htmlFor="title" className={'ml-1'}>Title</Label>
                    <Input
                        id="title"
                        className={"font-semibold bg-background"}
                        {...register("title")}
                    />
                </div>
                {/* for description  */}
                <div className="grid gap-2">
                    <Label htmlFor="description" className={'ml-1'}>Description</Label>
                    <Textarea
                        id="description"
                        className={"h-26 resize-none bg-background"}
                        {...register("description")}
                    />
                </div>
                {/* field heading  */}
                 <h3 className="text-xl font-semibold text-center ">Fields</h3>
                <Separator />
                {/* for dnd fields  */}
                <SortableContext items={elements}>
                    <div className="w-full grid gap-3 ">
                        {
                            elements.map((field) =>
                                <SelectedField key={field.id} field={field} />
                            )
                        }
                    </div>
                </SortableContext>
            </form>
        </section>
    )
}

export default FormCanvas
