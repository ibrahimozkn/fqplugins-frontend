import React, { useEffect, useState } from "react";
import { IServer } from "../types/IServer";
import { DashboardService } from "../features/dashboard/dashboardService";
import { validateIp, validatePort } from "../utils/validation";
import ServerTable from "../features/dashboard/components/ServerTable";

function AddServer() {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  const validate = () => {
    if (validateIp(ip) || validatePort(port)) {
      setError("Please enter a valid IP address and port number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIp("");
      setPort("");
      setError("");
      DashboardService.addServer({ ip, port, userId: null })
        .then((server) => {
          setRefresh((prev) => prev + 1);
        })
        .catch((error) => {
          console.log(error);
          setError("IP and Port must be unique");
        });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold mb-5">Add Server</h1>
        {error && <div className="alert alert-error shadow-lg">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mb-4 lg:flex-row"
        >
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
        <ServerTable triggerRefresh={refresh} />
      </div>
    </>
  );
}

export default AddServer;
