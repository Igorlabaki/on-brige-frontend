import {ReactNode,Dispatch,SetStateAction} from "react"
import { Company } from "./ICompanyContext";
import { Developer } from "./IDeveloperContext";

export interface ILoginRequestBody {
    email: string;
    password: string;
    userType?: string;
}

export interface IRegisterRequestBody {
    email: string;
    password: string;
    name:string
    userType?: string;
    level: string,
    area: string
}

export interface AuthContextProvider {
    children: ReactNode;
}

export interface IAuthContext {
  area: string;
  level: string;
  signOut: () => void;
  modeSignIn: boolean;
  modeSignUp: boolean;
  uploadPhoto: (file: any) => void;
  recoverUserInformation: () => void
  authUser: Developer | Company | null;
  setArea: Dispatch<SetStateAction<string >>
  setLevel: Dispatch<SetStateAction<string >>
  signIn: (reference: ILoginRequestBody) => void;
  userType: "" | "developer" | "company" | undefined;
  setmodeAuthModal: Dispatch<SetStateAction<"signIn" | "signUp">>;
  setAuthUser: Dispatch<SetStateAction<Developer | Company | null>>;
  setUserType: Dispatch<SetStateAction<"developer" | "company" | undefined>>;
}