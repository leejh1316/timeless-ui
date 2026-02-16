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
import CollapsiblePage from "@src/pages/docs/collapsible/CollapsiblePage";
import CounterPage from "@src/pages/docs/counter/CounterPage";
import DropdownPage from "@src/pages/docs/dropdown/DropdownPage";
import FileUploadPage from "@src/pages/docs/file-upload/FileUploadPage";
import FunnelPage from "@src/pages/docs/funnel/FunnelPage";
import ImagePage from "@src/pages/docs/image/ImagePage";
import InViewPage from "@src/pages/docs/in-view/InViewPage";
import ModalPage from "@src/pages/docs/modal/ModalPage";
import PaginationPage from "@src/pages/docs/pagination/PaginationPage";
import PopoverPage from "@src/pages/docs/popover/PopoverPage";
import ProgressBarPage from "@src/pages/docs/progress-bar/ProgressBarPage";
import RadioGroupPage from "@src/pages/docs/radio-group/RadioGroupPage";
import InputPage from "@src/pages/docs/input/InputPage";
import SelectPage from "@src/pages/docs/select/SelectPage";
import TabsPage from "@src/pages/docs/tabs/TabsPage";
import TOCPage from "@src/pages/docs/toc/TOCPage";
import TooltipPage from "@src/pages/docs/tooltip/TooltipPage";
import UseArrowNavigationPage from "@src/pages/docs/use-arrow-navigation/UseArrowNavigationPage";
import UseSnoozePage from "@src/pages/docs/use-snooze/UseSnoozePage";

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
      { path: "/docs/collapsible", element: <CollapsiblePage />, name: "Collapsible" },
      { path: "/docs/counter", element: <CounterPage />, name: "Counter" },
      { path: "/docs/date-picker", element: <DatePickerPage />, name: "DatePicker" },
      { path: "/docs/dropdown", element: <DropdownPage />, name: "Dropdown" },
      { path: "/docs/file-upload", element: <FileUploadPage />, name: "FileUpload" },
      { path: "/docs/funnel", element: <FunnelPage />, name: "Funnel" },
      { path: "/docs/image", element: <ImagePage />, name: "Image" },
      { path: "/docs/in-view", element: <InViewPage />, name: "InView" },
      { path: "/docs/input", element: <InputPage />, name: "Input" },
      { path: "/docs/modal", element: <ModalPage />, name: "Modal" },
      { path: "/docs/pagination", element: <PaginationPage />, name: "Pagination" },
      { path: "/docs/popover", element: <PopoverPage />, name: "Popover" },
      { path: "/docs/progress-bar", element: <ProgressBarPage />, name: "ProgressBar" },
      { path: "/docs/radio-group", element: <RadioGroupPage />, name: "RadioGroup" },
      { path: "/docs/select", element: <SelectPage />, name: "Select" },
      { path: "/docs/tabs", element: <TabsPage />, name: "Tabs" },
      { path: "/docs/toc", element: <TOCPage />, name: "TOC" },
      { path: "/docs/tooltip", element: <TooltipPage />, name: "Tooltip" },
    ],
  },
  hooks: {
    title: "Hooks",
    routes: [
      { path: "/docs/use-arrow-navigation", element: <UseArrowNavigationPage />, name: "useArrowNavigation" },
      { path: "/docs/use-snooze", element: <UseSnoozePage />, name: "useSnooze" },
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
