"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data } = await authClient.getSession();
      if (data?.user) {
        await fetch(`${API}/api/jwt/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: data.user.email,
            name: data.user.name,
          }),
        });
        setUser(data.user);
        setLoading(false);
        return;
      }

      const res = await fetch(`${API}/api/user/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const jwtData = await res.json();
        setUser(jwtData.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function loginWithEmail(email, password) {
    const { data, error } = await signIn.email({
      email,
      password,
      fetchOptions: {
        credentials: "include",
      },
    });
    if (error) throw new Error(error.message || "Login failed");

    if (data?.user) {
      await fetch(`${API}/api/jwt/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.user.email,
          name: data.user.name,
        }),
      });
      setUser(data.user);
    }
    return data;
  }

  async function registerWithEmail(name, email, password, image) {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || "",
      fetchOptions: {
        credentials: "include",
      },
    });
    if (error) throw new Error(error.message || "Registration failed");
    return data;
  }

  async function loginWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "https://b13-a9-client-drivefleet.vercel.app",
    });
  }

  async function logout() {
    await signOut();
    await fetch(`${API}/api/jwt/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}