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
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useState } from 'react';
import DragOverWrapper from '@/components/custom/form/editor/DragOverWrapper';

function FormEditor() {
    const allElements = [
        { type: "text", icon: Type },
        { type: "textarea", icon: AlignLeft },
        { type: "number", icon: Hash },
        { type: "email", icon: Mail },
        { type: "password", icon: Lock },
        { type: "select", icon: List },
        { type: "checkbox", icon: CheckSquare },
        { type: "radio", icon: CircleDot },
        { type: "date", icon: Calendar },
        { type: "file", icon: Upload },
        { type: "url", icon: Link },
        { type: "image", icon: Image },
    ];
    // handle new selected element preview
    const [activeBtn, setActiveBtn] = useState(null);
    function handleActiveElement({ active }) {
        setActiveBtn(active.data?.current?.element)
    }

    return (
        <main className="p-3">
            <PageHeader title={"Create Form"} />
            <DndContext
                onDragStart={handleActiveElement}>
                <div className=" grid gap-3 h-[86vh] grid-cols-1 sm:grid-cols-4 mt-3">
                    {/* canvas */}
                    <FormCanvas allElements={allElements} />
                    {/* editor */}
                    <EditorSidebar elements={allElements} />
                </div>
                {/* overlay  */}
                <DragOverlay>
                    <DragOverWrapper element={activeBtn} />
                </DragOverlay>
            </DndContext>
        </main>
    )
}

export default FormEditor
