import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Shares only the login modal open/close state (demo UI, no real authentication).
export function AuthProvider({ children }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const value = {
    loginOpen,
    openLogin: () => setLoginOpen(true),
    closeLogin: () => setLoginOpen(false),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
