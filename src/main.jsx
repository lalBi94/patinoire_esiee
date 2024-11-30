import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Home from "./pages/Home/Home";
import Cotiser from "./pages/Cotiser/Cotiser";
import Tarif from "./pages/Tarif/Tarif";
import Seance from "./pages/Seance/Seance";
import Admin from "./pages/Admin/Admin.jsx";
import Unfound from "./pages/Unfound/Unfound.jsx";

const router = createBrowserRouter([
    { path: "*", element: <Unfound /> },
    { path: "/", element: <Home /> },
    { path: "/accueil", element: <Home /> },
    { path: "/maison", element: <Home /> },
    { path: "/cotiser", element: <Cotiser /> },
    { path: "/tarifs", element: <Tarif /> },
    { path: "/seance", element: <Seance /> },
    { path: "/adminland", element: <Admin /> },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
