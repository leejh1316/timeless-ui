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
import InputPage from "@src/pages/input/InputPage";
import TextareaPage from "@src/pages/textarea/TextareaPage";
import PaginationPage from "@src/pages/pagination/PaginationPage";
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

type RouteCategory = {
  [categoryName: string]: {
    title: string;
    routes: RouteConfig[];
  };
};
export const PAGE_ROUTES: RouteCategory = {};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: `${PATH.NOT_FOUND}`,
    element: <PageNotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
