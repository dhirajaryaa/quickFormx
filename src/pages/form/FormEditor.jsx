import { EditorSidebar, FormCanvas } from "@/components/custom"
import useStore from "@/store"

function FormEditor() {
    // const { createForm } = useStore()
    return (
        <main className="p-3 grid gap-3 h-full grid-cols-1 sm:grid-cols-4">
            {/* canvas */}
            <FormCanvas />
            {/* editor */}
            <EditorSidebar />
        </main>
    )
}

export default FormEditor
