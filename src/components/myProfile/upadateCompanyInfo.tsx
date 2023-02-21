import React, { useState } from "react";
import { ButtonComponent } from "../util/button";
import { CountryListComponent } from "../util/countryList";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import useUpadateCompanyInfo from "../../hooks/company/useUpdateCompanyInfo";
interface UpadateCompanyProps {
  handleEditModeClose: () => void;
}

export function UpadateCompanyComponent({
  handleEditModeClose,
}: UpadateCompanyProps) {
  const { authUser } = useRecoverUserData();

  const [updateBodyRequest, setUpdateBodyRequest] = useState({
    companyId: authUser?.id,
    name: authUser?.name,
    email: authUser?.email,
    about: authUser?.about,
    cityName: authUser?.City?.name,
    countryName: authUser?.Country?.name,
  });

  const { companyInfoMutate, companyInfoIsLoading } = useUpadateCompanyInfo({
    bodyReq: updateBodyRequest,
    handleClose: handleEditModeClose,
  });

  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="w-full flex justify-end items-center">
        <div className="flex gap-2">
          <ButtonComponent
            type="button"
            title={companyInfoIsLoading ? "Loading..." : "Save"}
            onClick={(e) => {
              e.preventDefault();
              companyInfoMutate();
            }}
            className={`
            ${companyInfoIsLoading && "animate-pulse"}
            bg-desaturatedDarkCyan py-1 text-white font-semibold text-[13px] rounded-md w-[100px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]`}
          />
          <ButtonComponent
            type="button"
            title="Cancel"
            onClick={() => handleEditModeClose()}
            className="bg-red-400 py-1 text-white font-semibold text-[13px] rounded-md w-[100px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <input
          placeholder={updateBodyRequest?.name || "Type company name"}
          type="text"
          className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
          value={updateBodyRequest.name}
          onChange={(e) => {
            e.preventDefault();
            setUpdateBodyRequest((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        <input
          placeholder="Type your email"
          type="email"
          className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
          value={updateBodyRequest.email}
          onChange={(e) => {
            e.preventDefault();
            setUpdateBodyRequest((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        <CountryListComponent setState={setUpdateBodyRequest} />
        <div className="flex flex-col  justify-center items-start w-full gap-y-2">
          <p className="text-[15px] text-desaturatedDarkCyan">About:</p>
          <textarea
            className="bg-LightGrayishCyan resize-none w-full h-[200px] text-sm py-2 px-2 outline-none rounded-lg "
            placeholder={
              updateBodyRequest?.about ? "" : "Write about your compay..."
            }
            value={updateBodyRequest?.about}
            onChange={(e) =>
              setUpdateBodyRequest((prev) => ({
                ...prev,
                about: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
}
