import App from "@src/App";
import AccordionPage from "@src/pages/accordion/AccordionPage";
import AlertDialogPage from "@src/pages/alert-dialog/AlertDialogPage";
import { AspectRatioPage } from "@src/pages/aspect-ratio/AspectRatioPage";
import BreakpointPage from "@src/pages/breakpoint/BreakpointPage";
import ButtonPage from "@src/pages/button/ButtonPage";
import CalendarPage from "@src/pages/calendar/CalendarPage";
import CarouselPage from "@src/pages/carousel/CarouselPage";
import CheckboxGroupPage from "@src/pages/checkbox-group/CheckboxGroupPage";
import CheckboxPage from "@src/pages/checkbox/CheckboxPage";
import CollapsiblePage from "@src/pages/collapsible/CollapsiblePage";
import DatePickerPage from "@src/pages/date-picker/DatePickerPage";
import DropdownPage from "@src/pages/dropdown/DropdownPage";
import PageNotFound from "@src/pages/error/PageNotFound";
import FormPage from "@src/pages/form/FormPage";
import ImagePage from "@src/pages/image/ImagePage";
import InViewPage from "@src/pages/in-view/InViewPage";
import ModalPage from "@src/pages/modal/ModalPage";
import PopoverPage from "@src/pages/popover/PopoverPage";
import PresencePage from "@src/pages/presence/PresencePage";
import RadioGroupPage from "@src/pages/radio-group/RadioGroupPage";
import SliderPage from "@src/pages/slider/SliderPage";
import SelectPage from "@src/pages/select/SelectPage";
import TabsPage from "@src/pages/taps/TabsPage";
import ToastPage from "@src/pages/toast/ToastPage";
import TogglePage from "@src/pages/toggle/TogglePage";
import TooltipPage from "@src/pages/tooltip/TooltipPage";
import UseArrowNavigationPage from "@src/pages/use-arrow-navigation/UseArrowNavigationPage";
import UsePaginationPage from "@src/pages/use-pagination/UsePaginationPage";
import UseSnoozePage from "@src/pages/use-snooze/UseSnoozePage";
import UseBreakpointPage from "@src/pages/use-breakpoint/UseBreakpointPage";
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
  components: {
    title: string;
    routes: RouteConfig[];
  };
  hooks: {
    title: string;
    routes: RouteConfig[];
  };
  // usage: {
  //   title: string;
  //   routes: RouteConfig[];
  // };
} = {
  components: {
    title: "컴포넌트(Components)",
    routes: [
      {
        path: "/",
        element: <AspectRatioPage></AspectRatioPage>,
        name: "AspectRatio",
        handle: { crumb: "AspectRatio" },
      },
      { path: "/accordion", element: <AccordionPage />, name: "Accordion", handle: { crumb: "Accordion" } },
      {
        path: "/alert-dialog",
        element: <AlertDialogPage />,
        name: "AlertDialog",
        handle: { crumb: "AlertDialog" },
      },
      { path: "/breakpoint", element: <BreakpointPage />, name: "Breakpoint", handle: { crumb: "Breakpoint" } },
      { path: "/button", element: <ButtonPage />, name: "Button", handle: { crumb: "Button" } },
      { path: "/calendar", element: <CalendarPage />, name: "Calendar", handle: { crumb: "Calendar" } },
      { path: "/checkbox", element: <CheckboxPage />, name: "Checkbox", handle: { crumb: "Checkbox" } },
      {
        path: "/checkbox-group",
        element: <CheckboxGroupPage />,
        name: "CheckboxGroup",
        handle: { crumb: "CheckboxGroup" },
      },
      { path: "/carousel", element: <CarouselPage />, name: "Carousel", handle: { crumb: "Carousel" } },
      { path: "/collapsible", element: <CollapsiblePage />, name: "Collapsible", handle: { crumb: "Collapsible" } },
      { path: "/date-picker", element: <DatePickerPage />, name: "DatePicker", handle: { crumb: "DatePicker" } },
      { path: "/dropdown", element: <DropdownPage />, name: "Dropdown", handle: { crumb: "Dropdown" } },
      { path: "/image", element: <ImagePage />, name: "Image", handle: { crumb: "Image" } },
      { path: "/in-view", element: <InViewPage />, name: "InView", handle: { crumb: "InView" } },
      { path: "/modal", element: <ModalPage />, name: "Modal", handle: { crumb: "Modal" } },
      { path: "/popover", element: <PopoverPage />, name: "Popover", handle: { crumb: "Popover" } },
      { path: "/presence", element: <PresencePage />, name: "Presence", handle: { crumb: "Presence" } },
      { path: "/select", element: <SelectPage />, name: "Select", handle: { crumb: "Select" } },
      { path: "/toggle", element: <TogglePage />, name: "Toggle", handle: { crumb: "Toggle" } },
      { path: "/tooltip", element: <TooltipPage />, name: "Tooltip", handle: { crumb: "Tooltip" } },
      { path: "/tabs", element: <TabsPage />, name: "Tabs", handle: { crumb: "Tabs" } },
      { path: "/toast", element: <ToastPage />, name: "Toast", handle: { crumb: "Toast" } },
      { path: "/radio-group", element: <RadioGroupPage />, name: "RadioGroup", handle: { crumb: "RadioGroup" } },
      { path: "/slider", element: <SliderPage />, name: "Slider", handle: { crumb: "Slider" } },
      { path: "/form", element: <FormPage />, name: "Form", handle: { crumb: "Form" } },
    ],
  },
  hooks: {
    title: "훅(Hooks)",
    routes: [
      {
        path: "/use-pagination",
        element: <UsePaginationPage />,
        name: "usePagination",
        handle: { crumb: "usePagination" },
      },
      {
        path: "/use-breakpoint",
        element: <UseBreakpointPage />,
        name: "useBreakpoint",
        handle: { crumb: "useBreakpoint" },
      },
      {
        path: "/use-arrow-navigation",
        element: <UseArrowNavigationPage />,
        name: "useArrowNavigation",
        handle: { crumb: "useArrowNavigation" },
      },
      {
        path: "/use-snooze",
        element: <UseSnoozePage />,
        name: "useSnooze",
        handle: { crumb: "useSnooze" },
      },
    ],
  },
  // usage: {
  //   title: "활용(Usage)",
  //   routes: [{ path: "#", element: null, name: "지연 로딩 이미지", handle: { crumb: "지연 로딩 이미지" } }],
  // },
} as const;

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      ...PAGE_ROUTES.components.routes,
      ...PAGE_ROUTES.hooks.routes,
      //   ...PAGE_ROUTES.usage.routes
    ],
  },
  {
    path: `${PATH.NOT_FOUND}`,
    element: <PageNotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
