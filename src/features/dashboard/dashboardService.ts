import axios from "axios";
import { IServer } from "../../types/IServer";
import { API_URL } from "../../utils/constants";
import IRequestResponse from "../../types/IRequestResponse";

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

  static async addServer(server: IServer): Promise<IServer> {
    const token = sessionStorage.getItem("token");
    const response: IRequestResponse<IServer> = await axios.post(
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

    return response.data;
  }
}
