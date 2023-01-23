import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import useErrors from "../functions/useErrors";
import { api } from "../service/axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import {
  AuthContextProvider,
  IAuthContext,
  ILoginRequestBody,
  IRegisterRequestBody,
} from "./contextRepositories/IAuthContext";
import { Developer } from "./contextRepositories/IDeveloperContext";
import { Company } from "./contextRepositories/ICompanyContext";
import axios from "axios";

export const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({ children }: AuthContextProvider) {
  const [authUser, setAuthUser] = useState<Developer | Company | null>(null);
  const { setError, removeError } = useErrors();
  const [authLoading, setAuthLoading] = useState(Boolean);
  const [userType, setUserType] = useState<"developer" | "company">();
  const [level, setLevel] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [modeAuthModal, setmodeAuthModal] = useState<"signIn" | "signUp">(
    "signIn"
  );

  const modeSignIn = modeAuthModal.includes("signIn");
  const modeSignUp = modeAuthModal.includes("signUp");

  async function signIn({ email, password }: ILoginRequestBody) {
    setAuthLoading(() => true);
    const data = await api.post("/auth/authenticateAccount", {
      email,
      password,
      userType,
    });

    const token = data.data.token;
    const error = data.data.message && data.data;

    if (token) {
      const decoded: any = jwt_decode(token);
      setAuthUser(() => decoded.user);
      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setAuthLoading(() => false);
      window.location.reload();
    } else if (error) {
      const errorBody = {
        field: error.status,
        message: error.message,
      };
      setAuthLoading(() => false);
      setError(errorBody);
      setTimeout(() => removeError(error.status), 3000);
    }
  }

  async function recoverUserInformation() {
    const { "auth.token": token } = parseCookies();
    if (token) {
      api
        .get("/auth/recoveryAccountData", {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((response) => {
          return setAuthUser(response.data);
        });
    }
  }

  async function signUp({ email, name, password }: IRegisterRequestBody) {
    const data = await api.post("/auth/createNewDeveloperAccount", {
      email,
      name,
      password,
      level,
      area,
      userType,
    });

    const token = data.data.token;
    const error = data.data.message && data.data;

    if (token) {
      const decoded: any = jwt_decode(token);
      setAuthUser(decoded.user);
      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      window.location.reload();
    } else if (error) {
      const errorBody = {
        field: error.status,
        message: error.message,
      };
      setError(errorBody);
      setTimeout(() => removeError(error.status), 2000);
    }
  }

  async function uploadPhoto(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", "972746539144337");
    formData.append("api_secret", "-odjGAqU-hd76JQeZUCHx5tbC8Y");
    formData.append("upload_preset", "onbridge");

    const photoUpload = await fetch(
      "https:api.cloudinary.com/v1_1/dcjkvwbvh/image/upload",
      {
        method: "post",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        const bodyReq = {
          avatar: data.url,
          email: authUser?.id,
        };

        if (authUser?.userType?.includes("developer")) {
          const developer = await axios
            .put("/company/updateAvatar", bodyReq)
            .then((resp) => resp.data);
        } else {
          const companyrUpdated = await axios
            .put("/company/updateAvatar", bodyReq)
            .then((resp) => resp.data);
        }
        recoverUserInformation();
      });
  }

  async function signOut() {
    destroyCookie(null, "auth.token");
    window.location.reload();
  }

  useEffect(() => {
    recoverUserInformation();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        uploadPhoto,
        signIn,
        signOut,
        authUser,
        userType,
        area,
        level,
        modeSignIn,
        modeSignUp,
        setArea,
        setAuthUser,
        setUserType,
        setLevel,
        setmodeAuthModal,
        recoverUserInformation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
