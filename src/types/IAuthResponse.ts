import { User } from "./IUser";

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}
