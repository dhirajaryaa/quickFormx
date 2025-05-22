import { useDndMonitor } from '@dnd-kit/core'
import ElementOverlay from './ElementOverlay';
import { useState } from 'react';

function DragOverWrapper({ elements }) {
    const [activeBtn, setActiveBtn] = useState(null)
    useDndMonitor({
        onDragStart({ active }) {
            console.log("drag start: ", active); // This should not be null
        },
        onDragOver({ active }) {
            setActiveBtn(elements.find(el => el.type === active.id))
        },
        onDragCancel(element) {
            setActiveBtn(null)
        }
    });
    return (
        <ElementOverlay element={activeBtn} />
    )
}
export default DragOverWrapper
