import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface LoginFields {
  username: string;
  password: string;
}

function Login() {
  const { login, error } = useAuth();
  const [fields, setFields] = useState<LoginFields>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(fields.username, fields.password);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mx-auto bg-neutral flex flex-col rounded-lg p-10 items-center justify-center">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
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
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
        <p className="text-sm text-neutral-content mt-2">
          New customer?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
