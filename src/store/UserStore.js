import {create} from 'zustand';
import {info,logout} from '@/services/user'
import { removeLocalStorage, setLocalStorage } from '@/utils/storage';

const userStore = create((set) => ({
  user: {},
  isLoading: false,
  error: null,
  isLogin:false,
  getInfo: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await info();
      // setLocalStorage("username")
      set({ user: data, isLoading: false, isLogin:true });
    } catch (error) {
      set({error: error.message, isLoading: false, isLogin:false });
    }
  },
  logout:async()=>{
    try {
      set({ isLoading: true, error: null });
      const data = await logout();
      removeLocalStorage("authorization")
      // setLocalStorage("username")
      set({ user: {}, isLoading: false, isLogin:false });
    } catch (error) {
      set({error: error.message, isLoading: false, isLogin:false });
    }
  }
}));

export default userStore;