import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Home } from "../pages/Home";
import { Comunidade } from "../pages/Comunidade";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/comunidade",
        element: <Comunidade />,
      },
    ],
  },
]); 