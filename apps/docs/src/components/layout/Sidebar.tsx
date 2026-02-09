import { NavLink } from "react-router";
import { PAGE_ROUTES } from "@src/router/router";

const Sidebar = () => {
  return (
    <aside className="sticky top-[calc(var(--h-header)+1px)] hidden h-[calc(100vh-var(--h-header)-1px)] overflow-y-auto py-8 pr-4 md:col-span-3 md:block lg:col-span-2">
      <nav className="space-y-8">
        {Object.entries(PAGE_ROUTES).map(([key, category]) => (
          <div key={key}>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">{category.title}</h4>
            <ul className="space-y-2">
              {category.routes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `block text-sm ${isActive ? "font-medium text-black" : "text-gray-600 hover:text-gray-900"}`
                    }
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
