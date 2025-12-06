import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Spinner } from "./components/base/Spinner";
import { useFetchHome } from "./api/endpoints/home";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { data, isLoading, isSuccess } = useFetchHome();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!(isSuccess && data)) return;
    setIsLogin(data.isLogin);
    setIsReady(true);
  }, [isSuccess, data, setIsLogin]);

  return (
    <div className="min-h-dvh w-full bg-gray-50 pb-12">
      {isLoading && (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner color="primary" size="lg" />
        </div>
      )}
      {isReady && <Outlet />}
    </div>
  );
}

export default App;
