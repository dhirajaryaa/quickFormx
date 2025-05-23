import Element from './Element';
function EditorSidebar({ elements }) {
    return (
        <aside className='bg-muted border p-2 rounded-lg shadow-lg sm:h-full sm:w-70 w-full'>
            <h2 className='font-semibold mx-3 my-2'>Elements</h2>
            <div className={`grid grid-flow-col sm:grid-flow-row sm:grid-cols-2 sm:min-w-0 py-4 gap-2 overflow-x-scroll sm:overflow-x-hidden`}>
                {elements.map((element) => (
                    <Element element={element} key={element.type} />
                ))}
            </div>
        </aside>
    )
}

export default EditorSidebar
