import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../LandingPage/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user",
    element: <App />,
  },
]);
