export const validateUsername = (username: string): string | null => {
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return null;
};

export const validateSteamId = (steamId: string): string | null => {
  if (steamId.length != 17) {
    return "Please enter a valid Steam ID";
  }

  return null;
};

export const validateIp = (ip: string): string | null => {
  const ipRegex = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
  if (!ipRegex.test(ip)) {
    return "Please enter a valid IP address";
  }
  return null;
};

export const validatePort = (port: string): string | null => {
  const portRegex = /^[0-9]{1,5}$/;
  if (!portRegex.test(port)) {
    return "Please enter a valid port number";
  }
  return null;
};
