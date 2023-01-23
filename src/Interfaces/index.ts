export interface ErrorAuth {
    field: string
    message:string
}

export interface AuthToken {
    authToken: string
}

export interface Area {
    id: string,
    name: string
}

export interface Level {
    id: string,
    name: string
}

export interface Country {
    id: string,
    name: string
}

export interface Period {
    id: string,
    name: string
}

export interface City {
    id: string,
    name: string
}

export interface CountriesCityies{
    iso2: string
    iso3: string
    cities: String[]
    country: string
}


export interface IUpdatejob{
    area: string;
    jobId: string;
    about: string;
    level: string;
    period: string;
    cityName: string;
    companyId: string;
    countryName: string;
    minimumPercentagem: string;
  /*   skills:  JobsSkills[]; */
}