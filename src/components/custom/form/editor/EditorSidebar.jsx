import { Separator } from '@/components/ui/separator'
import Element from './Element';
function EditorSidebar({ elements }) {
    return (
        <aside className='bg-muted border p-2 rounded-lg shadow-lg h-full w-xs'>
            <h2 className='font-semibold mx-3 my-2'>Elements</h2>
            <Separator />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 my-3'>
                {
                    elements.map((element) =>
                        <Element element={element} key={element.type} />
                    )
                }
            </div>
        </aside>
    )
}

export default EditorSidebar
