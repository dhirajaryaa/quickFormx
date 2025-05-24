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
    SquarePen,
    ExternalLink,
    Save
} from 'lucide-react';
import { EditorSidebar, FormCanvas, PageHeader, DragOverWrapper } from "@/components/custom"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import useStore from '@/store';
import { useForm } from '@/hooks/useForm';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useId } from 'react';

function FormEditor() {
    const formId = useId()
    const [isDraft,setIsDraft] = useState(true);
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
    };

    return (
        <main className="p-3">
            <PageHeader title={"Create Form"} >
                <div className='flex gap-2'>
                    <Button type={'button'} variant={'secondary'} onClick={togglePreview} size={'sm'}>
                        {
                            !isPreview ?
                                <View /> :
                                <SquarePen />
                        }
                        <span className='sm:block hidden'>{!isPreview ? "Preview" : "Editor"}</span>
                    </Button>
                    <Button form={formId} size={'sm'} variant={'outline'} onClick={()=>setIsDraft(true)} >
                        <Save />
                        <span>Save</span>
                    </Button>
                    <Button form={formId} size={'sm'} onClick={()=>setIsDraft(false)} >
                        <ExternalLink />
                        <span>Publish</span>
                    </Button>
                </div>
            </PageHeader>
            <DndContext
                onDragStart={handleActiveElement}>
                <div className="sm:h-[86vh] flex gap-3 mt-3 items-center justify-center flex-col-reverse sm:flex-row">
                    {/* canvas */}
                    <FormCanvas allElements={allElements} formId={formId} isDraft={isDraft} />
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
