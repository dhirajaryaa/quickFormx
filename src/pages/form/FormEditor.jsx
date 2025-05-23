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
    ExternalLink
} from 'lucide-react';
import { EditorSidebar, FormCanvas, PageHeader, DragOverWrapper } from "@/components/custom"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import useStore from '@/store';
import { useForm } from '@/hooks/useForm';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

function FormEditor() {
    const { isPreview, togglePreview, createForm,setForms } = useStore();
    const navigate = useNavigate();
    const { createNewForm: { mutateAsync, isPending }} = useForm()
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

    // handle form create
    async function handleFormCreate() {
        const updatedFields = createForm.fields.map((field) => ({ ...field, name: `${field.label.split(" ")[0].toLowerCase()}_${Date.now()}` }));
        const res = await mutateAsync({ ...createForm, fields: updatedFields });
        if (res.statusCode >= 400) { // error
            toast.error(res.message);
        } else { // success
            setForms(res?.data);
            navigate("/forms");
        }
    }

    return (
        <main className="p-3">
            <PageHeader title={"Create Form"} >
                <div className='flex gap-2'>
                    <Button type={'button'} variant={'outline'} onClick={togglePreview} size={'sm'}>
                        {
                            !isPreview ?
                                <View /> :
                                <SquarePen />
                        }
                        <span className='sm:block hidden'>{!isPreview ? "Preview" : "Editor"}</span>
                    </Button>
                    <Button type={'button'} size={'sm'} onClick={handleFormCreate}>
                        <ExternalLink />
                        <span>Publish</span>
                    </Button>
                </div>
            </PageHeader>
            <DndContext
                onDragStart={handleActiveElement}>
                <div className="sm:h-[86vh] flex gap-3 mt-3 items-center justify-center flex-col-reverse sm:flex-row">
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
