import useStore from "@/store"

function FormEditor() {
    const { createForm } = useStore()
    return (
        <div>FormEditor
            <h1>{createForm.title}</h1>
            <p>{createForm.description}</p>
        </div>
    )
}

export default FormEditor
