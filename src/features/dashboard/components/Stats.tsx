import React, { useEffect, useState } from "react";
import { FaPlug, FaServer } from "react-icons/fa";
import { DashboardService } from "../dashboardService";

function Stats() {
  const [serverCount, setServerCount] = useState(0);
  const [pluginCount, setPluginCount] = useState(0);

  useEffect(() => {
    DashboardService.getServerCount()
      .then((res) => {
        setServerCount(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    DashboardService.getPluginCount()
      .then((res) => {
        setPluginCount(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaPlug className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Plugins Owned</div>
        <div className="stat-value">{pluginCount}</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaServer className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Active Servers</div>
        <div className="stat-value">{serverCount}</div>
      </div>
    </div>
  );
}

export default Stats;
