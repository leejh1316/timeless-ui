import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router";
import router from "./router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClinet";
const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
