import { NavLink } from "react-router";
import { PAGE_ROUTES } from "@src/router/router";
import clsx from "clsx";
interface SidebarProps extends React.ComponentPropsWithoutRef<"aside"> {}
const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <aside {...props} className={clsx(className)}>
      <nav className="space-y-8 pb-28">
        {Object.entries(PAGE_ROUTES).map(([key, category]) => (
          <div key={key}>
            <h4 className="text-body-4 text-ink-tertiary mb-3 font-semibold uppercase tracking-wider">{category.title}</h4>
            <ul>
              {category.routes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      clsx(
                        "text-body-2 block py-1.5 transition-colors",
                        isActive ? "font-semibold" : "text-ink-secondary hover:text-ink-primary",
                      )
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
