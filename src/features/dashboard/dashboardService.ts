import axios from "axios";
import { IServer } from "../../types/IServer";
import { API_URL } from "../../utils/constants";
import IRequestResponse from "../../types/IRequestResponse";
import { IPlugin } from "../../types/IPlugin";

export class DashboardService {
  static async getUserServers(): Promise<IRequestResponse<IServer[]>> {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/server/`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    return response.data;
  }

  static async addServer(server: IServer): Promise<IRequestResponse<IServer>> {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/server/`,
      { ip: server.ip, port: server.port },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(response);

    return response.data;
  }

  static async deleteServer(ip: string, port: string): Promise<void> {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/server/${ip}/${port}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status != 204) {
      throw new Error("Failed to delete server");
    }
  }

  static async getServerCount(): Promise<IRequestResponse<number>> {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/server/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getPluginCount(): Promise<IRequestResponse<number>> {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/plugin/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getUserPlugins(): Promise<IRequestResponse<IPlugin[]>> {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}/plugin/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
