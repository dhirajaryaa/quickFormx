
const createFormSlice = (set) => ({
    forms: [],
    activeForm: null,
    isPreview: false,
    inEditMode: false,
    createForm: {
        title: "",
        description: "",
        fields: []
    },
    setForms: (forms) => set(() => ({ forms })),
    setActiveForm: (form) => set(() => ({ activeForm: form })),
    setCreateFormData: (data) => set((prev) => ({ createForm: { ...prev.createForm, ...data } })),
    setCreateFormFields: (data) => set((prev) => ({ createForm: { ...prev.createForm, fields: data } })),
    togglePreview: () => set((prev) => ({ isPreview: !prev.isPreview })),
    setInEditMode: (value) => set((prev) => ({ inEditMode: value }))
});
export default createFormSlice;
