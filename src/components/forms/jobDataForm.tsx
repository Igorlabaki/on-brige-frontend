import { IoIosClose } from "react-icons/io";
import { ErrorAuth } from "../../Interfaces";
import React, { useState, useEffect } from "react";
import { ButtonComponent } from "../util/button";
import useErrors from "../../functions/useErrors";
import SelectItemsComponent from "../util/selectItems";
import { RegisterReqBody } from "../modals/newJobModal";
import { CountryListComponent } from "../util/countryList";
import useModalsContext from "../../hooks/useModalsContext";
import useCreateNewJob from "../../hooks/job/useCreateNewJob";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { Job } from "../../context/contextRepositories/IJobContext";

interface JobDataFormProps {
  title: string;
  job?: RegisterReqBody;
}

export default function JobDataFormComponent({ title, job }: JobDataFormProps) {
  const { authUser } = useRecoverUserData();
  const { errors, setError, removeError } = useErrors();
  const { handleCloseNewJobModal } = useModalsContext();
  const defaultReqBody = {
    companyId: authUser?.id,
    area: "",
    about: "",
    level: "",
    period: "",
    cityName: "",
    countryName: "",
    minimumPercentagem: "50",
  };
  const [registerReqBody, setRegisterReqBody] = useState<RegisterReqBody>(
    job ? job : defaultReqBody
  );
  const {
    createNewJob,
    isErrorNewJob,
    newJobError,
    isNewJobIsLoading,
    newJobStatus,
  } = useCreateNewJob(registerReqBody);

  function handleChangeInput(event: any) {
    const field = event.target.name;
    const value = event.target.value;

    setRegisterReqBody({ ...registerReqBody, [field]: value });

    if (!value) {
      setError({ field: field, message: `${field} is required` });
    } else {
      removeError(field);
    }
  }

  useEffect(() => {
    if (isErrorNewJob) {
      const messageError = newJobError?.response?.data.message;
      setError({ field: messageError, message: messageError });
      setTimeout(() => removeError(messageError), 2000);
    }
  }, [isErrorNewJob]);
  return (
    <div
      className="bg-white  flex justify-start items-center flex-col relative
    rounded-lg animate-openOpacity w-full px-10 py-10"
    >
      <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
        <IoIosClose
          size={25}
          className={"text-desaturatedDarkCyan cursor-pointer"}
          onClick={() => handleCloseNewJobModal && handleCloseNewJobModal()}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-desaturatedDarkCyan text-[25px] font-semibold">
          {title}
        </p>
        <div>
          {errors.length > 0 && (
            <div
              className={`e
            bg-red-200 flex justify-center items-start 
            rounded-lg text-[12px] italic font-semibold text-red-600  py-1 px-3
            animate-openOpacity flex-col space-x-2 w-full animate-openCart
            `}
            >
              <p>Please correct the error(s) below:</p>
              {errors.map((error: ErrorAuth, index: number) => {
                return <p key={index}>- {error.message}</p>;
              })}
            </div>
          )}
          <div className="flex flex-col justify-start items-center gap-y-4 py-5 w-[100%]">
            <SelectItemsComponent
              title="Select level"
              field={"level"}
              type={registerReqBody.level}
              setType={setRegisterReqBody}
              listOptions={[
                "Intern",
                "Junior",
                "Middle",
                "Senior",
                "Specialist",
              ]}
              handleHidden={true}
            />
            <SelectItemsComponent
              field={"area"}
              title="Select area"
              type={registerReqBody.area}
              setType={setRegisterReqBody}
              listOptions={["Frontend", "Backend", "FullStack"]}
              handleHidden={true}
            />
            <SelectItemsComponent
              field={"period"}
              title="Select period"
              type={registerReqBody.period}
              setType={setRegisterReqBody}
              listOptions={["Full time", "Part time"]}
              handleHidden={true}
            />
            <div className="w-full flex flex-col justify-start items-start gap-y-2">
              <CountryListComponent setState={setRegisterReqBody} />
              <div className="flex flex-col  justify-center items-start w-full gap-y-2">
                <p className="text-[15px] text-desaturatedDarkCyan">About:</p>
                <textarea
                  className="bg-LightGrayishCyan resize-none w-full h-[200px] text-sm py-2 px-2 outline-none rounded-lg "
                  placeholder={
                    registerReqBody?.about ? "" : "Write about the job..."
                  }
                  value={registerReqBody?.about}
                  onChange={(e) =>
                    setRegisterReqBody((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex w-full space-x-1`}>
          <ButtonComponent
            title={isNewJobIsLoading ? "Loading..." : "Save"}
            disabled={isNewJobIsLoading ? true : false}
            className="bg-desaturatedDarkCyan rounded-md text-sm text-white py-2 flex-1 w-[100px]"
            onClick={() => {
              createNewJob();
              setRegisterReqBody(() => ({
                ...defaultReqBody,
              }));
            }}
          />
          <ButtonComponent
            title="Cancel"
            disabled={isNewJobIsLoading ? true : false}
            className="bg-red-300 rounded-md text-sm text-white py-2 flex-1 w-[100px]"
            onClick={() => {
              handleCloseNewJobModal && handleCloseNewJobModal();
            }}
          />
        </div>
      </div>
    </div>
  );
}
