import { useFetchHome } from "@src/api/home";
import { useFetchMyInfo } from "@src/api/my";
import RouteGuard from "@src/components/auth/RouteGuard";
import Header from "@src/components/layout/Header";
import { Outlet } from "react-router";

const AppProcess = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default AppProcess;
