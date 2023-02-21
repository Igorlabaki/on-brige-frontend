import axios from "axios";
import React, { useState, useEffect } from "react";
import { CountriesCityies } from "../../Interfaces";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";

interface Props {
  setState: any;
}

interface CountryList {
  country: string;
  cities: [];
}

export function CountryListComponent({ setState }: Props) {
  const [countryCitites, setCountryCitites] = useState<any>();
  const { authUser } = useRecoverUserData();
  const [country, setcountry] = useState<CountryList>();

  useEffect(() => {
    async function teste() {
      const countriesCities = await axios
        .get(`https://countriesnow.space/api/v0.1/countries`)
        .then((resp) => resp.data.data);
      setCountryCitites(() => [...countriesCities]);
    }
    teste();
  }, []);

  return (
    <div className="flex space-x-7">
      <select
        id="country"
        name="country"
        className="w-[110px] outline-none text-desaturatedDarkCyan my-2 bg-LightGrayishCyan py-1 px-2 rounded-md shadow-md text-sm cursor-pointer"
        onChange={(e: any) => {
          e.preventDefault();
          const countryName = JSON.parse(e.target.value);
          setState((prev: any) => ({
            ...prev,
            countryName: countryName.country,
          }));
          setcountry(() => countryName);
        }}
      >
        <option className="py-2 px-2">
          {authUser?.Country?.name ? authUser.Country.name : "Country"}
        </option>
        {countryCitites?.map((item: CountriesCityies, i: number) => {
          return (
            <option value={JSON.stringify(item)} key={i}>
              {item.country}
            </option>
          );
        })}
      </select>
      {country || authUser?.City ? (
        <select
          id="city"
          name="city"
          className="w-[110px] outline-none text-desaturatedDarkCyan my-2 bg-LightGrayishCyan shadow-md rounded-md  py-1 px-2  text-sm animate-openMenu"
          onChange={(e) => {
            setState((prev: any) => ({
              ...prev,
              cityName: e.target.value,
            }));
          }}
        >
          <option className="py-2 px-2">
            {" "}
            {authUser?.Country?.name ? authUser.City.name : "City"}
          </option>
          {country?.cities?.map((item: any, i: number) => {
            return (
              <option value={item} key={i}>
                {item}
              </option>
            );
          })}
        </select>
      ) : null}
    </div>
  );
}
