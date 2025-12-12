import { Outlet } from "react-router";
import Button from "./components/base/Button";
import Sidebar from "./components/layout/Sidebar";
import { useEffect, useState } from "react";
import { Toast } from "@timeless-ui/ui";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-950">
      <Toast.Provider>
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 flex h-16 items-center border-b border-gray-200 bg-white px-4 sm:hidden dark:border-gray-800 dark:bg-gray-950">
          <button
            type="button"
            className="-ml-2 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
            UI Components
          </div>
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
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
