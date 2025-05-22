import { Separator } from '@/components/ui/separator'
import Element from './Element';
function EditorSidebar({elements}) {
    return (
        <aside className='bg-muted border p-2 rounded-lg shadow-lg col-span-1'>
            <h2 className='font-semibold mx-3 my-2'>Elements</h2>
            <Separator />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 my-3'>
                {
                    elements.map((element) =>
                        <Element element={element} key={element.id} />
                    )
                }
            </div>
        </aside>
    )
}

export default EditorSidebar
