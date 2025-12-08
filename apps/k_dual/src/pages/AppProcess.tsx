import RouteGuard from "@src/components/auth/RouteGuard";
import Header from "@src/components/layout/Header";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

const AppProcess = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <RouteGuard>
      <Header />
      <div className="pb-20 md:pb-0">
        <Outlet />
      </div>
    </RouteGuard>
  );
};

export default AppProcess;
