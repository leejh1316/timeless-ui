import { Outlet } from "react-router";
import { useState } from "react";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="font-pretendard text-ink-primary scrollbar font-medium">
      <Header />
      <div className="max-w-page mx-auto min-h-[calc(100dvh-var(--h-header)-1px)] w-full px-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
