import "@fontsource-variable/inter";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.tsx";
import { DashboardPage } from "@/pages/Dashboard/Deashboard";
import { CreatePlantPage } from "@/pages/CreatePlant/CreatePlant";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: DashboardPage },
      { path: "create-plant", Component: CreatePlantPage },
      { path: "notifications", Component: CreatePlantPage },
      { path: "settings", Component: CreatePlantPage },
      { path: "plants", Component: CreatePlantPage },
      { path: "calendar", Component: CreatePlantPage },
      {
        path: "plant/:plantId",
        loader: async ({ params }) => {
          // const plant = await fetchPlant(params.plantId);
          // return { plant };
        },
        Component: CreatePlantPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
