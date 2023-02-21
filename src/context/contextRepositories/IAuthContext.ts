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
  signOut: () => void;
}