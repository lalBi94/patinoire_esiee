import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.scss";
import Home from "./pages/Home/Home";
import Cotiser from "./pages/Cotiser/Cotiser";
import Tarif from "./pages/Tarif/Tarif";
import Seance from "./pages/Seance/Seance";
import Admin from "./pages/Admin/Admin.jsx";

const router = createHashRouter([
    { path: "*", element: <Home /> },
    { path: "cotiser", element: <Cotiser /> },
    { path: "tarifs", element: <Tarif /> },
    { path: "seance", element: <Seance /> },
    {path: "adminland", element: <Admin/> },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
