const createFormSlice = (set) => ({
    forms: [],
    activeForm: null,
    setForms: (forms) => set(() => ({ forms })),
    setActiveForm: (from) => set(() => ({ activeForm: form }))
});
export default createFormSlice;
