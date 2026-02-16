import App from "@src/App";
import DocsLayout from "@src/components/layout/DocsLayout";
import AccordionPage from "@src/pages/docs/accordion/AccordionPage";
import AlertDialogPage from "@src/pages/docs/alert-dialog/AlertDialogPage";
import BreakpointPage from "@src/pages/docs/breakpoint/BreakpointPage";
import ButtonPage from "@src/pages/docs/button/ButtonPage";
import Home from "@src/pages/Home";

import DatePickerPage from "@src/pages/docs/date-picker/DatePickerPage";
import PageNotFound from "@src/pages/errors/PageNotFound";
import { createBrowserRouter, RouteObject } from "react-router";
import CalendarPage from "@src/pages/docs/calendar/CalendarPage";
import CarouselPage from "@src/pages/docs/carousel/CarouselPage";
import CheckboxPage from "@src/pages/docs/checkbox/CheckboxPage";
import CheckboxGroupPage from "@src/pages/docs/checkbox-group/CheckboxGroupPage";

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
      { path: "/docs/carousel", element: <CarouselPage />, name: "Carousel" },
      { path: "/docs/checkbox", element: <CheckboxPage />, name: "Checkbox" },
      { path: "/docs/checkbox-group", element: <CheckboxGroupPage />, name: "CheckboxGroup" },
      { path: "/docs/date-picker", element: <DatePickerPage />, name: "DatePicker" },
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
