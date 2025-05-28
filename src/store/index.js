import {create} from 'zustand'
import createUserSlice from "./slices/userSlice";
import createFormSlice from './slices/formSlice';

const useStore = create((set,get)=>({
    ...createUserSlice(set,get), // user slice
    ...createFormSlice(set,get), // form slice
}))

export default useStore;
