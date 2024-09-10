import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardHome from "./pages/DashboardHome";
import DashboardLayout from "./layouts/DashboardLayout";
import AddServer from "./pages/AddServer";
import MyPlugins from "./pages/MyPlugins";
import ProtectedRoute from "./components/ProtectedRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<DashboardLayout children={<DashboardHome />} />}
          />
          <Route
            path="/dashboard/add-server"
            element={<DashboardLayout children={<AddServer />} />}
          />
          <Route
            path="/dashboard/my-plugins"
            element={<DashboardLayout children={<MyPlugins />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
