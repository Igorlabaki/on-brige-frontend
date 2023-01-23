import {ReactNode,Dispatch,SetStateAction} from "react"
import { Area, City, Country, Level, Period } from "../../Interfaces";
import { Company } from "./ICompanyContext";

export interface Job  {
    id: string;
    created_at: Date;
    areaId: string | null;
    area: Area;
    about: string | null;
    periodId: string | null;
    period: Period;
    levelId: string | null;
    level: Level;
    Company:Company;
    companyId:string | null;
    countryId: string | null;
    Country: Country;
    cityId: string | null;
    City: City;
    minimumPercentagem: string | null
}

export interface JobContextProvider {
   children: ReactNode;
}

export interface IJobContext {
    job?: any;
    jobList?: any;
    getJobList?: () => void;
    isListJobLoading?: boolean;
    selectJobById?: (id: any) => any;
}
