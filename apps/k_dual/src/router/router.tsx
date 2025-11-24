import App from "@src/App";
import Dashboard from "@src/pages/Dashboard";
import LearningLog from "@src/pages/LearningLog";

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

export const PAGE_ROUTES: {
} = {
} as const;

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "learning-log",
        element: <LearningLog />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
