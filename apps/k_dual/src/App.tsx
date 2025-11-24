import { Outlet } from "react-router";

function App() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <Outlet />
    </div>
  );
}

export default App;
