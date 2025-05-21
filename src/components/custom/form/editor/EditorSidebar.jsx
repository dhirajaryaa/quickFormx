import { Separator } from '@/components/ui/separator'
import Element from './Element';
import { SortableContext } from '@dnd-kit/sortable';
function EditorSidebar({elements}) {
    return (
        <aside className='bg-muted border p-2 rounded-lg shadow-lg col-span-1'>
            <h2 className='font-semibold mx-3 my-2'>Elements</h2>
            <Separator />
            <div className='grid grid-cols-2 gap-3 my-3'>
                <SortableContext items={elements}>
                {
                    elements.map((element) =>
                        <Element element={element} key={element.id} />
                    )
                }
                </SortableContext>
            </div>
        </aside>
    )
}

export default EditorSidebar
