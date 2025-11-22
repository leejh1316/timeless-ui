import App from "@src/App";

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
      //   ...PAGE_ROUTES.usage.routes
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
