
const createFormSlice = (set) => ({
    forms: [],
    activeForm: null,
    isPreview: false,
    createForm: {
        title: "",
        description: "",
        fields: []
    },
    setForms: (forms) => set(() => ({ forms })),
    setActiveForm: (form) => set(() => ({ activeForm: form })),
    setCreateFormData: (data) => set((prev) => ({ createForm: { ...prev.createForm, ...data } })),
    togglePreview: () => set((prev) => ({ isPreview: !prev.isPreview }))
});
export default createFormSlice;
