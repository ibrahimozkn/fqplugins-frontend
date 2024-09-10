import { User } from "./IUser";

export interface AuthResponse {
  token: string;
  user: User;
}
