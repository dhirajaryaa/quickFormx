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
    View,
    ExternalLink
} from 'lucide-react';
import { EditorSidebar, FormCanvas, PageHeader } from "@/components/custom"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useState } from 'react';
import DragOverWrapper from '@/components/custom/form/editor/DragOverWrapper';
import { Button } from '@/components/ui/button';
import useStore from '@/store';
import { SquarePen } from 'lucide-react';

function FormEditor() {
    const { isPreview, togglePreview } = useStore();
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
        { type: "url", icon: Link }
    ];
    // handle new selected element preview
    const [activeBtn, setActiveBtn] = useState(null);
    function handleActiveElement({ active }) {
        setActiveBtn(active.data?.current?.element)
    }

    return (
        <main className="p-3">
            <PageHeader title={"Create Form"} >
                <div className='flex gap-2'>
                    <Button type={'button'} variant={'outline'} onClick={togglePreview}>
                        {
                            !isPreview ?
                            <View />:
                            <SquarePen />
                        }
                        <span>{!isPreview ? "Preview":"Editor"}</span>
                    </Button>
                    <Button type={'button'}>
                        <ExternalLink />
                        <span>Publish</span>
                    </Button>
                </div>
            </PageHeader>
            <DndContext
                onDragStart={handleActiveElement}>
                <div className="sm:h-[86vh] flex gap-3 mt-3 items-center justify-between flex-col-reverse sm:flex-row">
                    {/* canvas */}
                    <FormCanvas allElements={allElements} />
                    {
                        !isPreview &&
                        <>
                            {/* editor */}
                            <EditorSidebar elements={allElements} />
                        </>
                    }
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
