import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

function Element({ element }) {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: element.type });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className='flex flex-col gap-1 items-center justify-center border rounded-xl p-3 bg-background shadow touch-none'
            style={style}
        >
            {element.icon && <element.icon size="16" />}
            <span className="capitalize text-sm">{element.type}</span>
        </div>
    )
}

export default Element
