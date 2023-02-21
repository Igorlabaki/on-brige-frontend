import { createContext } from "react";
import { destroyCookie } from "nookies";
import {
  AuthContextProvider,
  IAuthContext,
} from "./contextRepositories/IAuthContext";

export const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({ children }: AuthContextProvider) {
  async function signOut() {
    destroyCookie(null, "auth.token");
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
