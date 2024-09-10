import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthResponse } from "../../types/IAuthResponse";
import { User } from "../../types/IUser";
import IRequestResponse from "../../types/IRequestResponse";
import apiClient from "../../utils/apiClient";
import { getRefreshToken } from "../../utils/storage";

class AuthService {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<IRequestResponse<AuthResponse>>(
      `${API_URL}/user/login`,
      {
        username,
        password,
      }
    );

    if (response.data.success === false) {
      throw new Error("Login failed");
    }

    return response.data.data;
  }

  async register(
    username: string,
    email: string,
    steamId: string,
    password: string
  ): Promise<IRequestResponse<User>> {
    const response = await apiClient.post(`${API_URL}/user/register`, {
      username,
      email,
      steam_id: steamId,
      password,
    });

    if (response.status !== 201) {
      throw new Error("Registration failed");
    }

    return response.data;
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<IRequestResponse<AuthResponse>>(
      `${API_URL}/user/refresh-token`,
      {
        refreshToken: getRefreshToken(),
      }
    );

    if (response.data.success === false) {
      throw new Error("Failed to refresh token");
    }

    return response.data.data;
  }
}

export const authService = new AuthService();
