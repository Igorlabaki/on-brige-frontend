import {ReactNode,Dispatch,SetStateAction} from "react"
import { Area, City, Country, Level } from "../../Interfaces";

export interface Developer  {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    emailVerified: Date | null;
    created_at: Date;
    userType: string | null;
    about: string | null;
    countryId: string | null;
    cityId: string | null;
    locationInterestingId: string | null;
    areaId: string | null;
    Area: Area
    level: Level
    Country: Country,
    City: City,
    levelId: string | null;
}

export interface DeveloperContextProvider {
    children: ReactNode;
}

export interface IDeveloperContext {
    developer?: any;
    developerList?: any;
    isDeveloperDataLoading: boolean;
    getAllDevelopers(): Promise<void>;
    selectDeveloperById(id: string): Promise<void>;
    setDeveloper: Dispatch<SetStateAction<Developer | undefined>>
}