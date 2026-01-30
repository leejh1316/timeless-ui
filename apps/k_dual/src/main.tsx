import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router";
import router from "./router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClinet";
import { Toast } from "./components/base/Toast";
import { GlobalToast } from "./components/base/GlobalToast";
import { mockInit } from "./config/mock";

const Root = () => {
  mockInit();
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider swipeDirection="right">
        <RouterProvider router={router} />
        <GlobalToast />
      </Toast.Provider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
