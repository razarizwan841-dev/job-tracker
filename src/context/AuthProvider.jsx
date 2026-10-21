import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fireBase/fireBase";
import React from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const HandleOnAuth = onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);
      setIsLoading(false);
    });
    return () => HandleOnAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
