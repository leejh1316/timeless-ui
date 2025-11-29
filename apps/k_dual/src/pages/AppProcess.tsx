import RouteGuard from "@src/components/auth/RouteGuard";
import Header from "@src/components/layout/Header";
import { Outlet } from "react-router";

const AppProcess = () => {
  return (
    <RouteGuard>
      <Header />
      <Outlet />
    </RouteGuard>
  );
};

export default AppProcess;
