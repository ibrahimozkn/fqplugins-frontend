import React, { useEffect, useState } from "react";
import Stats from "../features/dashboard/components/Stats";
import { FaPlug, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { DashboardService } from "../features/dashboard/dashboardService";
import { IServer } from "../types/IServer";
import ServerTable from "../features/dashboard/components/ServerTable";

function DashboardHome() {
  const { user } = useAuth();
  return (
    <>
      <h2 className="text-2xl font-bold">Welcome, {user?.username}</h2>
      <Stats />
      <div className="divider"></div>
      <h3 className="text-xl font-semibold mb-4">Servers List</h3>
      <ServerTable triggerRefresh={0} />
    </>
  );
}

export default DashboardHome;
