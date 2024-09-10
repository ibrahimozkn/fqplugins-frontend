import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../features/auth/authService";
import { User } from "../types/IUser";
import { AuthResponse } from "../types/IAuthResponse";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
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

      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      console.log("User set in state:", response.user);

      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);

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
