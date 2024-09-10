import React, { useEffect, useState } from "react";
import Stats from "../features/dashboard/components/Stats";
import { FaPlug, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { DashboardService } from "../features/dashboard/dashboardService";
import { IServer } from "../types/IServer";

function DashboardHome() {
  const { user } = useAuth();

  const [servers, setServers] = useState<IServer[]>([]);

  useEffect(() => {
    DashboardService.getUserServers()
      .then((res) => {
        console.log(res);
        if (res.data) {
          setServers(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold">Welcome, {user?.username}</h2>
      <Stats />
      <div className="divider"></div>
      <h3 className="text-xl font-semibold mb-4">Servers List</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>IP</th>
              <th>Port</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr key={server.ip}>
                <td>{server.ip}</td>
                <td>{server.port}</td>
                <td>
                  <button className="btn btn-sm btn-error mr-2">Delete</button>
                  <button className="btn btn-sm btn-primary">
                    Request Whitelist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashboardHome;
