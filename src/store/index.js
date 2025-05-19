import {create} from 'zustand'
import createUserSlice from "./slices/userSlice";

const useStore = create((set,get)=>({
    ...createUserSlice(set,get), // user slice
}))

export default useStore;
