import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthResponse } from "../../types/IAuthResponse";
import { User } from "../../types/IUser";
import IRequestResponse from "../../types/IRequestResponse";

class AuthService {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<IRequestResponse<AuthResponse>>(
      `${API_URL}/user/login`,
      {
        username,
        password,
      }
    );
    console.log(response.data);
    if (response.data.success === false) {
      throw new Error("Login failed");
    }

    return response.data.data;
  }

  logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }

  getCurrentUser(): User | null {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  async register(
    username: string,
    email: string,
    steamId: string,
    password: string
  ): Promise<IRequestResponse<User>> {
    const response = await axios.post(`${API_URL}/user/register`, {
      username,
      email,
      steam_id: steamId,
      password,
    });

    console.log(response);

    if (response.status !== 201) {
      throw new Error("Registration failed");
    }

    return response.data;
  }
}

export const authService = new AuthService();
