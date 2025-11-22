import { PAGE_ROUTES } from "@src/router/router";
import React from "react";
import { NavLink } from "react-router";

// 아이콘 SVG (예제용)
const ComponentIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
    <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
    <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
    <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
  </svg>
);

const Sidebar = () => {
  const baseLinkClasses = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200";
  const activeLinkClasses = "bg-gray-700 text-white font-semibold";
  const inactiveLinkClasses = "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-gray-600 bg-gray-800 sm:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-gray-800 px-6">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <ComponentIcon className="h-6 w-6 text-blue-400" />
          <span>UI Components</span>
        </a>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="grid items-start gap-y-6 text-sm font-medium">
          {Object.values(PAGE_ROUTES).map((section) => (
            <div key={section.title} className="grid gap-y-2">
              <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</h2>
              <ul className="grid gap-y-1">
                {section.routes.map((route) => (
                  <li key={route.name}>
                    <NavLink
                      to={route.path}
                      end
                      className={({ isActive }) =>
                        `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                      }
                    >
                      {route.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
