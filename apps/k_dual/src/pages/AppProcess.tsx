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
