import { create } from "zustand";
interface AuthState {
  isLogin: boolean;
  name: string | null;
  profileImageUrl: string | null;
  role: string | null;
}
interface AuthActions {
  setIsLogin: (isLogin: boolean) => void;
  setName: (name: string | null) => void;
  setProfileImageUrl: (url: string | null) => void;
  setRole: (role: string | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  isLogin: false,
  name: null,
  profileImageUrl: null,
  role: null,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  setName: (name: string | null) => set({ name }),
  setProfileImageUrl: (url: string | null) => set({ profileImageUrl: url }),
  setRole: (role: string | null) => set({ role }),
}));
