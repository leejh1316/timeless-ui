import App from "@src/App";
import RouteGuard from "@src/components/auth/RouteGuard";
import AppProcess from "@src/pages/AppProcess";
import Dashboard from "@src/pages/Dashboard";
import DashboardPage from "@src/pages/dashboard/DashboardPage";
import LearningLog from "@src/pages/learning-log/LearningLog";
import LoginPage from "@src/pages/login/LoginPage";

import { createBrowserRouter, RouteObject } from "react-router";

export const PATH = {
  NOT_FOUND: `*`,
};
export interface RouteConfig {
  path: string;
  element: React.ReactNode | null;
  name: string;
  handle: {
    crumb: string;
  };
}

export const PAGE_ROUTES: {} = {} as const;

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <AppProcess />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
            handle: {
              category: "home",
            },
          },
          {
            path: "style/home",
            element: <Dashboard />,
            handle: {
              category: "home",
            },
          },
          {
            path: "learning-log",
            element: <LearningLog />,
            handle: {
              category: "learning-log",
            },
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
        handle: {
          category: "login",
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
