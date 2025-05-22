import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";

function Element({ element }) {
    const { setNodeRef, attributes, listeners, isDragging } = useDraggable({ id: element.type, data: { element } });

    return (
        <Button
            ref={setNodeRef}
            type={'button'}
            variant={'outline'}
            {...attributes}
            {...listeners}
            className={`flex flex-col gap-1 items-center justify-center py-8 bg-background shadow cursor-grab ${isDragging && "ring-2 ring-accent-foreground/50"}`}
        >
            {element.icon && <element.icon size="16" />}
            <span className="capitalize text-sm">{element.type}</span>
        </Button>
    )
};

export default Element
