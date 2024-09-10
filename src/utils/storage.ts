import { User } from "../types/IUser";

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const setToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setStorageUser = (user: User) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
};

export const removeUser = () => {
  sessionStorage.removeItem("user");
};

export const getRefreshToken = () => {
  return sessionStorage.getItem("refreshToken");
};

export const setRefreshToken = (refreshToken: string) => {
  sessionStorage.setItem("refreshToken", refreshToken);
};

export const removeRefreshToken = () => {
  sessionStorage.removeItem("refreshToken");
};
