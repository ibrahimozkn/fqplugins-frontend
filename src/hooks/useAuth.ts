import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../features/auth/authService";
import { User } from "../types/IUser";
import { AuthResponse } from "../types/IAuthResponse";
import {
  getToken,
  getUser,
  removeRefreshToken,
  removeToken,
  removeUser,
  setRefreshToken,
  setStorageUser,
  setToken,
} from "../utils/storage";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = getUser();
    const token = getToken();

    if (savedUser && token) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);

    try {
      const response: AuthResponse = await authService.login(
        username,
        password
      );

      setToken(response.token);
      setRefreshToken(response.refreshToken);
      setStorageUser(response.user);

      setUser(response.user);

      console.log("User set in state:", getUser());

      setTimeout(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    removeRefreshToken();

    navigate("/", { replace: true });
  };

  const isAuthenticated = () => !!user;

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  };
};
