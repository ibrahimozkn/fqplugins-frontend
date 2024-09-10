import React, { useEffect, useState } from "react";
import { IServer } from "../types/IServer";
import { DashboardService } from "../features/dashboard/dashboardService";

function AddServer() {
  const [servers, setServers] = useState<IServer[]>([]);
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    DashboardService.getUserServers()
      .then((servers) => {
        if (servers.data) {
          setServers(servers.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ip && port) {
      setServers([...servers, { ip, port, userId: -1 }]);
      setIp("");
      setPort("");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold mb-5">Add Server</h1>
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="IP"
            className="input input-bordered"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <input
            type="text"
            placeholder="Port"
            className="input input-bordered"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

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
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AddServer;
