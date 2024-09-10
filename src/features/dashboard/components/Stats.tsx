import React from "react";
import { FaPlug, FaServer } from "react-icons/fa";

function Stats() {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaPlug className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Plugins Owned</div>
        <div className="stat-value">5</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaServer className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Active Servers</div>
        <div className="stat-value">10</div>
      </div>
    </div>
  );
}

export default Stats;
