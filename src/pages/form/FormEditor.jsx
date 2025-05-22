import {
    Type,
    AlignLeft,
    Hash,
    Mail,
    Lock,
    List,
    CheckSquare,
    Calendar,
    Upload,
    CircleDot,
    Link,
    Image
} from 'lucide-react';
import { EditorSidebar, FormCanvas, PageHeader } from "@/components/custom"
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core"
import { useState } from 'react';
import DragOverWrapper from '@/components/custom/form/editor/DragOverWrapper';

function FormEditor() {
    const allElements = [
        {
            id: 1,
            type: "text",
            icon: Type,
        },
        {
            id: 2,
            type: "textarea",
            icon: AlignLeft,
        },
        {
            id: 3,
            type: "number",
            icon: Hash,
        },
        {
            id: 4,
            type: "email",
            icon: Mail,
        },
        {
            id: 5,
            type: "password",
            icon: Lock,
        },
        {
            id: 6,
            type: "select",
            icon: List,
        },
        {
            id: 7,
            type: "checkbox",
            icon: CheckSquare,
        },
        {
            id: 8,
            type: "radio",
            icon: CircleDot,
        },
        {
            id: 9,
            type: "date",
            icon: Calendar,
        },
        {
            id: 10,
            type: "file",
            icon: Upload,
        },
        {
            id: 11,
            type: "url",
            icon: Link,
        },
        {
            id: 12,
            type: "image",
            icon: Image,
        },
    ];
    const [selectedElements, setSelectedElements] = useState([
        {
            id: 1,
            type: "text",
            label: "Name",
            placeholder: "enter your name",
            required: true
        },
        {
            id: 2,
            type: "email",
            label: "Email",
            placeholder: "enter your email",
            required: true
        },
    ]);

    function handleFn(event) {
        const { active, over } = event;

        if (over && over.id === "canvas") {
            const newInput = allElements.find(el => el.type === active.id);

            if (newInput) {
                setSelectedElements((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        type: active.id,
                        label: `Name-${active.id}`,
                        placeholder: "enter your name",
                        required: true
                    }
                ]);
            }
        }

        setActiveId(null);
    }

    const [activeId, setActiveId] = useState(null);

    return (
        <main className="p-3">
            <PageHeader title={"Create Form"} />
            <DndContext
                onDragStart={(event) => {
                    setActiveId(event.active.id);
                }}
                onDragEnd={handleFn} >
                <div className=" grid gap-3 h-[86vh] grid-cols-1 sm:grid-cols-4 mt-3">
                    {/* canvas */}
                    <FormCanvas elements={selectedElements} />
                    {/* editor */}
                    <EditorSidebar elements={allElements} />
                </div>
                {/* overlay  */}
                <DragOverlay>
                    <DragOverWrapper elements={allElements} />
                </DragOverlay>
            </DndContext>
        </main>
    )
}

export default FormEditor
