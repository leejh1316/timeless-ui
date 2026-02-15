import App from "@src/App";
import Home from "@src/pages/Home";
import DocsLayout from "@src/components/layout/DocsLayout";
import AlertDialogPage from "@src/pages/docs/alert-dialog/AlertDialogPage";
import AccordionPage from "@src/pages/docs/accordion/AccordionPage";
import BreakpointPage from "@src/pages/docs/breakpoint/BreakpointPage";
import ButtonPage from "@src/pages/docs/button/ButtonPage";
import CalendarPage from "@src/pages/docs/calendar/CalendarPage";

import { createBrowserRouter, RouteObject } from "react-router";
import PageNotFound from "@src/pages/errors/PageNotFound";

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
    routes: [],
  },
  components: {
    title: "Components",
    routes: [
      { path: "/docs/accordion", element: <AccordionPage />, name: "Accordion" },
      { path: "/docs/alert-dialog", element: <AlertDialogPage />, name: "AlertDialog" },
      { path: "/docs/breakpoint", element: <BreakpointPage />, name: "Breakpoint" },
      { path: "/docs/button", element: <ButtonPage />, name: "Button" },
      { path: "/docs/calendar", element: <CalendarPage />, name: "Calendar" },
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
  {
    path: `${PATH.NOT_FOUND}`,
    element: <PageNotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
