import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router";
import router from "./router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClinet";
import { ToastProvider, ToastViewport } from "@timeless-ui/ui";
const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
        <ToastViewport className="fixed right-2 bottom-2 z-[9999] m-0 flex w-[320px] max-w-[100vw] list-none flex-col gap-2 outline-none" />
      </ToastProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
