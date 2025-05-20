
const createFormSlice = (set) => ({
    forms: [],
    activeForm: null,
    createForm: {
        title: "",
        description: ""
    },
    setForms: (forms) => set(() => ({ forms })),
    setActiveForm: (form) => set(() => ({ activeForm: form })),
    setCreateFormData: (data) => set((prev) => ({ createForm: { ...prev.createForm, ...data } }))
});
export default createFormSlice;
