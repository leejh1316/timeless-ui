import { Outlet } from "react-router";
import { useState } from "react";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="font-pretendard">
      <Header />
      <main className="max-w-page mx-auto min-h-[calc(100dvh-var(--h-header)-1px)] px-5">
        <div className="grid md:grid-cols-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
