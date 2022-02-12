import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  const register = async (user) => {
    setError("");
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/auth/account/settings");
    } else {
      //if username is already taken
      if (res.status == 400) {
        console.log(res.status == 400);

        setError("Email or username may already be taken");
      } else {
        //any other error
        setError(data.message);
      }
    }
  };

  const login = async ({ email: identifier, password }) => {
    setError("");
    console.log({ identifier, password });
    const res = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      //   router.push("/auth/account/settings");
    } else {
      setError(data.message);
    }
  };

  const logout = async () => {
    if (router.pathname.includes("auth")) {
      router.push("/auth/login");
    }

    const res = await fetch(`${NEXT_URL}/api/logout`, { method: "POST" });

    if (res.ok) {
      setUser(null);
    }
  };

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
    console.log(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
