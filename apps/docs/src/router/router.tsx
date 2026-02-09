import App from "@src/App";
import Home from "@src/pages/Home";
import DocDetail from "@src/pages/DocDetail";
import GettingStarted from "@src/pages/GettingStarted";
import Alert from "@src/pages/components/Alert";
import DocsLayout from "@src/components/layout/DocsLayout";

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
    title: "Getting Started",
    routes: [
      { path: "/docs/introduction", name: "Introduction", element: <GettingStarted /> },
      { path: "/docs/installation", name: "Installation", element: <DocDetail /> },
    ],
  },
  components: {
    title: "Components",
    routes: [
      { path: "/docs/button", name: "Button", element: <DocDetail /> },
      { path: "/docs/alert", name: "Alert", element: <Alert /> },
      { path: "/docs/input", name: "Input", element: <DocDetail /> },
    ],
  },
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "docs",
        element: <DocsLayout />,
        children: [
          // Generates routes from PAGE_ROUTES, or manually mapping them
          ...Object.values(PAGE_ROUTES).flatMap((category) =>
            category.routes.map((route) => ({
              path: route.path.replace("/docs/", ""), // remove prefix since we are in /docs
              element: route.element,
            })),
          ),
        ],
      },
    ],
  },
  // {
  //   path: `${PATH.NOT_FOUND}`,
  //   element: null,
  // },
];

const router = createBrowserRouter(routes);

export default router;
