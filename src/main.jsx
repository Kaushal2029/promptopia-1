  import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Auth/Register.jsx";
import Login from "./components/Auth/Login.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import { RecoilRoot } from "recoil";
import NotFound from "./components/Error/NotFound.jsx";
import CreatePrompt from "./components/CreatePrompt.jsx";
import Profile from "./components/Profile.jsx";
import EditPrompt from "./components/EditPrompt.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/create-prompt",
    element: <CreatePrompt />,
  },
  {
    path: "/profile/:profile",
    element: <Profile />,
  },
  {
    path: "/edit-prompt/:promptId",
    element: <EditPrompt />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
