import {create} from 'zustand';
import {info} from '@/services/user'
import { setLocalStorage } from '@/utils/storage';

const userStore = create((set) => ({
  user: {},
  isLoading: false,
  error: null,
  isLogin:false,
  getInfo: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await info();
      console.log("data",data)
      // setLocalStorage("username")
      set({ user: data, isLoading: false, isLogin:true });
    } catch (error) {
      set({error: error.message, isLoading: false, isLogin:false });
    }
  },
}));

export default userStore;