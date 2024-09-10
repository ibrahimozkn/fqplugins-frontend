import React, { useEffect, useState } from "react";
import { IPlugin } from "../types/IPlugin";
import { DashboardService } from "../features/dashboard/dashboardService";

function MyPlugins() {
  const [plugins, setPlugins] = useState<IPlugin[]>([]);

  useEffect(() => {
    DashboardService.getUserPlugins()
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setPlugins(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">My Plugins</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Plugin Name</th>
              <th>Version</th>
              <th>License Key</th>
            </tr>
          </thead>
          <tbody>
            {plugins.map((plugin) => (
              <tr key={plugin.id}>
                <td>{plugin.name}</td>
                <td>{plugin.version}</td>
                <td>{plugin.licenses[0].key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyPlugins;
