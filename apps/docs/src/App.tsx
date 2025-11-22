import { Outlet } from "react-router";
import Button from "./components/base/Button";
import Sidebar from "./components/layout/Sidebar";
import { useEffect } from "react";
import { Toast } from "@timeless-ui/ui";

function App() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <Toast.Provider>
        <Sidebar />
        <main className="sm:ml-64">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
        <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-80 list-none flex-col gap-4 p-4 outline-none" />
      </Toast.Provider>
    </div>
  );
}

export default App;
