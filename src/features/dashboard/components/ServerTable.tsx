import React, { useEffect, useState } from "react";
import { IServer } from "../../../types/IServer";
import { useAuth } from "../../../hooks/useAuth";
import { DashboardService } from "../dashboardService";

interface ServerTableProps {
  triggerRefresh: number;
}

function ServerTable({ triggerRefresh }: ServerTableProps) {
  const { user } = useAuth();

  const [servers, setServers] = useState<IServer[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    DashboardService.getUserServers()
      .then((res) => {
        if (res.data) {
          setServers(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh, triggerRefresh]);

  const handleDeleteServer = (ip: string, port: string) => {
    DashboardService.deleteServer(ip, port)
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>IP</th>
            <th>Port</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server, index) => (
            <tr key={index}>
              <td>{server.ip}</td>
              <td>{server.port}</td>
              <td>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDeleteServer(server.ip, server.port)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerTable;
