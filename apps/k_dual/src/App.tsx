import { Button } from "@timeless-ui/ui";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { axios } from "./api/axios";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-dvh w-full bg-gray-50">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
