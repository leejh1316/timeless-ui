import { Outlet } from "react-router";
import { useFetchHome } from "./api/home";
import { Spinner } from "./components/base/Spinner";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { scrape, ScrapeSchema } from "./utils/scraper";
import { useHomeStore, HOME_SCHEMA, HomeState } from "./store/useHomeStore";

function App() {
  const { data, isLoading, isSuccess } = useFetchHome();
  const setHomeData = useHomeStore((state) => state.setHomeData);
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  useEffect(() => {
    if (!(isSuccess && data)) return;
    const homeData = setHomeData(data);
    setIsLogin(homeData.isLogin ?? false);
    console.log(homeData);
  }, [isSuccess, data]);
  return (
    <div className="min-h-dvh w-full bg-gray-50">
      {isLoading ? (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default App;
