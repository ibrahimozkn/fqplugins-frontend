import React from "react";
import { FaPlus, FaPlug, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout, user, loading } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-5">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <h1
              className="text-2xl font-bold"
              onClick={() => navigate("/dashboard")}
            >
              FQPlugins
            </h1>
          </li>
          <li>
            <a
              className="flex items-center"
              onClick={() => navigate("/dashboard/add-server")}
            >
              <FaPlus className="mr-2" />
              Add Server
            </a>
          </li>
          <li>
            <a
              className="flex items-center"
              onClick={() => navigate("/dashboard/my-plugins")}
            >
              <FaPlug className="mr-2" />
              My Plugins
            </a>
          </li>
          <li>
            <a
              className="flex items-center lg:hidden"
              onClick={() => {
                const drawer = document.getElementById(
                  "my-drawer-2"
                ) as HTMLInputElement;
                if (drawer) {
                  drawer.checked = false;
                }
              }}
            >
              <FaTimes className="mr-2" />
              Close Menu
            </a>
          </li>
          <li className="mt-auto">
            <a className="flex items-center" onClick={logout}>
              <FaSignOutAlt className="mr-2" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;
