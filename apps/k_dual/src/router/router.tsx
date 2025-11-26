import App from "@src/App";
import Dashboard from "@src/pages/Dashboard";
import DashboardPage from "@src/pages/dashboard/DashboardPage";
import LearningLog from "@src/pages/learning-log/LearningLog";

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
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        handle: {
          category: "home",
        },
      },
      // {
      //   index: true,
      //   element: <DashboardPage />,
      //   handle: {
      //     category: "home",
      //   },
      // },
      {
        path: "learning-log",
        element: <LearningLog />,
        handle: {
          category: "learning-log",
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
