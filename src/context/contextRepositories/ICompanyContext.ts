import {ReactNode,Dispatch,SetStateAction} from "react"
import { City, Country } from "../../Interfaces";
import { Job } from "./IJobContext";

export interface Company  {
    id: string;
    name: string;
    password: string;
    email: string;
    countryId: string | null;
    Country: Country;
    cityId: string | null;
    City: City;
    Jobs: Job[]
    about: string | null;
    userType: string | null;
    created_at: Date;
    emailVerified: Date | null;
    avatar: string | null;
}

export interface CompanyContextProvider {
   children: ReactNode;
}

export interface ICompanyContext {
    company?: Company;
    isCompanyDataLoading?: boolean;
    selectCompanyById?: (id: any) => any;
    updateInfo?: (name: string, countryName: string, cityName: string, email: string, about: string) => void
}
