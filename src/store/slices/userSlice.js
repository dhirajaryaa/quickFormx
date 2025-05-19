const createUserSlice = (set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set(() => ({ user, isAuthenticated: true })),
    removeUser: () => set(() => ({ user: null, isAuthenticated: false }))
});
export default createUserSlice;
