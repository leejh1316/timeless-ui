// HomeFetch Store
import { scrape, ScrapeSchema } from "@src/utils/scraper";
import { create } from "zustand";
interface AuthState {
  isLogin: boolean;
}
interface AuthActions {
  setIsLogin: (data: boolean) => void;
}

const useAuthStore = create<AuthState & AuthActions>((set, get) => {
  return {
    isLogin: false,
    setIsLogin: (data) => set(() => ({ isLogin: data })),
  };
});
export { useAuthStore };
export type { AuthState, AuthActions };
