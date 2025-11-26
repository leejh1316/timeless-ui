import { create } from "zustand";
interface AuthState {
  isLogined?: boolean;
  name?: string;
  profileImageUrl?: string;
  role?: string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLogined: false,
  name: undefined,
  profileImageUrl: undefined,
  role: undefined,
  setIsLogined: (isLogined: boolean) => set({ isLogined }),
  setName: (name: string) => set({ name }),
  setProfileImageUrl: (url: string) => set({ profileImageUrl: url }),
  setRole: (role: string) => set({ role }),
}));
