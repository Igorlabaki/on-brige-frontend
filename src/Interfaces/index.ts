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


export interface UpdateJobReqBody{
    area: string | undefined;
    jobId: string | undefined;
    level: string | undefined;
    about: string | undefined;
    period: string | undefined;
    cityName: string | undefined;
    companyId: string | undefined;
    countryName: string | undefined;
    minimumPercentagem: string | undefined;
    skills: (string | undefined)[]
}


export interface RegisterJobReqBody {
    area: string | undefined;
    jobId: string | undefined;
    level: string | undefined;
    about: string | undefined;
    period: string | undefined;
    cityName: string | undefined;
    companyId: string | undefined;
    countryName: string | undefined;
    minimumPercentagem: string | undefined;
    skills: (string | undefined)[] | any[]
  }
  
  export type Link = {
    id: string
    name: string
    fk_id_user: string
  }
  