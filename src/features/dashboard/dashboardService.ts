import axios from "axios";
import { IServer } from "../../types/IServer";
import { API_URL } from "../../utils/constants";
import IRequestResponse from "../../types/IRequestResponse";
import { IPlugin } from "../../types/IPlugin";
import apiClient from "../../utils/apiClient";

export class DashboardService {
  static async getUserServers(): Promise<IRequestResponse<IServer[]>> {
    const response = await apiClient.get(`${API_URL}/server/`);

    return response.data;
  }

  static async addServer(server: IServer): Promise<IRequestResponse<IServer>> {
    const response = await apiClient.post(`${API_URL}/server/`, {
      ip: server.ip,
      port: server.port,
    });

    return response.data;
  }

  static async deleteServer(ip: string, port: string): Promise<void> {
    const response = await apiClient.delete(`${API_URL}/server/${ip}/${port}`);

    if (response.status != 204) {
      throw new Error("Failed to delete server");
    }
  }

  static async getServerCount(): Promise<IRequestResponse<number>> {
    const response = await apiClient.get(`${API_URL}/server/count`);

    return response.data;
  }

  static async getPluginCount(): Promise<IRequestResponse<number>> {
    const response = await apiClient.get(`${API_URL}/plugin/count`);

    return response.data;
  }

  static async getUserPlugins(): Promise<IRequestResponse<IPlugin[]>> {
    const response = await apiClient.get(`${API_URL}/plugin/user`);

    return response.data;
  }
}
