import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  users: User[];
  setUser: (user: User | null) => void;
  registerUser: (user: User) => void;
  signIn: (emailOrPhone: string, password: string) => User | null;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  users: [],
  
  setUser: (user) => set({ user }),
  
  registerUser: (user) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },
  
  signIn: (emailOrPhone, password) => {
    const state = get();
    const foundUser = state.users.find(
      (u) => (u.email === emailOrPhone || u.phoneNumber === emailOrPhone) && u.password === password
    );
    
    if (foundUser) {
      set({ user: foundUser });
      return foundUser;
    }
    
    return null;
  },
  
  logout: () => set({ user: null }),
}));