import React, { useState } from "react";
import { FaLock, FaSteam, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { authService } from "../features/auth/authService";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validatePassword,
  validateSteamId,
  validateUsername,
} from "../utils/validation";
import IRequestResponse from "../types/IRequestResponse";
import { User } from "../types/IUser";

interface RegisterFields {
  username: string;
  email: string;
  password: string;
  steamId: string;
}

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [fields, setFields] = useState<RegisterFields>({
    username: "",
    email: "",
    password: "",
    steamId: "",
  });

  const validateFields = (): boolean => {
    const errors: Partial<Record<keyof RegisterFields, string>> = {};

    const usernameError = validateUsername(fields.username);
    if (usernameError) errors.username = usernameError;

    const emailError = validateEmail(fields.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(fields.password);
    if (passwordError) errors.password = passwordError;

    const steamIdError = validateSteamId(fields.steamId);
    if (steamIdError) errors.steamId = steamIdError;

    setError(Object.values(errors).join("\n"));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      setLoading(true);

      const response: IRequestResponse<User> = await authService.register(
        fields.username,
        fields.email,
        fields.steamId,
        fields.password
      );

      if (!response.success) {
        setError(response.message);
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mx-auto bg-neutral flex flex-col rounded-lg p-10 items-center justify-center">
        <h1 className="text-2xl font-bold mb-5">Register</h1>
        {error && <p className="text-red-500 mb-5">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 form-control"
        >
          <label className="input input-bordered flex items-center gap-2">
            <FaUser className="h-4 w-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              value={fields.username}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <MdEmail className="h-4 w-4 opacity-70" />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              value={fields.email}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <FaLock className="h-4 w-4 opacity-70" />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              value={fields.password}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <FaSteam className="h-4 w-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="Steam Profile URL"
              name="steamId"
              value={fields.steamId}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
