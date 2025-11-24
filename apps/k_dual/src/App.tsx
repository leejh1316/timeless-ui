import { Outlet } from "react-router";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-dvh bg-gray-50">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
