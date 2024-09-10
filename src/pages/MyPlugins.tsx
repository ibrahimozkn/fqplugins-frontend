import React, { useEffect, useState } from "react";
import { IPlugin } from "../types/IPlugin";

function MyPlugins() {
  const [plugins, setPlugins] = useState<IPlugin[]>([]);

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
              <th>Date Purchased</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example Plugin</td>
              <td>1.0.0</td>
              <td>XXXX-XXXX-XXXX-XXXX</td>
              <td>2023-05-20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyPlugins;
