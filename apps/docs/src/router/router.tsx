import App from "@src/App";

import { createBrowserRouter, RouteObject } from "react-router";

export const PATH = {
  NOT_FOUND: `*`,
};
export interface RouteConfig {
  path: string;
  element: React.ReactNode | null;
  name: string;
}

type RouteCategory = {
  [categoryName: string]: {
    title: string;
    routes: RouteConfig[];
  };
};
export const PAGE_ROUTES: RouteCategory = {
  docs: {
    title: "Docs",
    routes: [],
  },
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [],
  },
  // {
  //   path: `${PATH.NOT_FOUND}`,
  //   element: null,
  // },
];

const router = createBrowserRouter(routes);

export default router;
