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
import { useId } from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

function FormEditor() {
    const formId = useId();
    const { createNewForm: { isPending } } = useForm();
    const { pathname } = useLocation()
    const [isDraft, setIsDraft] = useState(true);
    const { isPreview, togglePreview, setInEditMode, inEditMode } = useStore();
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
    // check if edit mode
    useEffect(() => {
        const mode = pathname?.split("/")[3];
        !inEditMode && mode === "edit" && setInEditMode(true);
    }, [pathname]);



    return (
        <main className="p-3">
            <PageHeader title={`${inEditMode ? "Edit" : "Create"} Form`} >
                <div className='flex gap-2'>
                    {/* preview  */}
                    <Button type={'button'} variant={'secondary'} onClick={togglePreview} size={'sm'}>
                        {
                            !isPreview ?
                                <View /> :
                                <SquarePen />
                        }
                        <span className='sm:block hidden'>{!isPreview ? "Preview" : "Editor"}</span>
                    </Button>
                    {/* draft  */}
                    {
                        isDraft ?
                            <Button form={formId} size={'sm'} disabled={isPending} >
                                {
                                    isPending ? <Loader2 className='animate-spin size-6' /> :
                                        <Save />
                                }
                                <span className='sm:block hidden'>Update</span>
                            </Button> :
                            <>
                                <Button form={formId} size={'sm'} variant={'outline'} onClick={() => setIsDraft(true)} disabled={isPending} >
                                    {
                                        isPending ? <Loader2 className='animate-spin size-6' /> :
                                            <Save />
                                    }
                                   <span className='sm:block hidden'>Save</span>
                                </Button>
                                {/* publish  */}
                                <Button form={formId} size={'sm'} onClick={() => setIsDraft(false)} disabled={isPending} >
                                    {
                                        isPending ? <Loader2 className='animate-spin size-6' /> :
                                            <ExternalLink />
                                    }
                                    <span>Publish</span>
                                </Button>
                            </>
                    }

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
