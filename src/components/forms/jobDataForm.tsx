import { IoIosClose } from "react-icons/io";
import { ButtonComponent } from "../util/button";
import useErrors from "../../functions/useErrors";
import React, { useState, useEffect } from "react";
import SelectItemsComponent from "../util/selectItems";
import { CountryListComponent } from "../util/countryList";
import useModalsContext from "../../hooks/useModalsContext";
import useCreateNewJob from "../../hooks/job/useCreateNewJob";
import useUpdateNewJob from "../../hooks/job/useUpdateNewJob";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import {
  ErrorAuth,
  RegisterJobReqBody,
  UpdateJobReqBody,
} from "../../Interfaces";
import useGetjobById from "../../hooks/job/useGetJobById";
import { Job } from "../../context/contextRepositories/IJobContext";
import { RiCloseFill } from "react-icons/ri";

interface JobDataFormProps {
  title: string;
  job?: any;
  onClose?: () => void;
}

export default function JobDataFormComponent({
  title,
  job,
  onClose,
}: JobDataFormProps) {
  const { authUser } = useRecoverUserData();
  const { errors, setError, removeError } = useErrors();
  const { handleCloseNewJobModal, handleCloseUpdateJobModal } =
    useModalsContext();

  const updateReqBody: UpdateJobReqBody = {
    jobId: job?.id,
    about: job?.about,
    area: job?.area.name,
    level: job?.level.name,
    period: job?.period.name,
    cityName: job?.City?.name,
    companyId: job?.companyId,
    countryName: job?.Country?.name,
    minimumPercentagem: job?.minimumPercentagem,
    skills: job?.Skills?.map((item: any) => item?.skill?.name) || [],
  };

  const defaultReqBody = {
    companyId: authUser?.id,
    jobId: "",
    area: "",
    about: "",
    level: "",
    period: "",
    cityName: "",
    countryName: "",
    minimumPercentagem: "",
    skills: [],
  };
  const [registerReqBody, setRegisterReqBody] = useState<RegisterJobReqBody>(
    job ? updateReqBody : defaultReqBody
  );

  const { createNewJob, isErrorNewJob, newJobError, isNewJobIsLoading } =
    useCreateNewJob(registerReqBody);

  const { updateJobMutate, isupdateJobIsLoading } =
    useUpdateNewJob(registerReqBody);

  const [selectSkill, setSelectSkill] = useState<string>();

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
          onClick={() => {
            handleCloseNewJobModal && handleCloseNewJobModal();
            handleCloseUpdateJobModal && handleCloseUpdateJobModal();
          }}
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
                    setRegisterReqBody((prev: any) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <form
            className="flex justify-start items-center w-full gap-x-1"
            onSubmit={(e) => {
              e.preventDefault();
              if (!selectSkill) {
                return;
              }

              if (registerReqBody?.skills?.length === 0) {
                setRegisterReqBody((prev) => ({
                  ...prev,
                  skills: [selectSkill],
                }));
              } else {
                if (
                  registerReqBody?.skills?.find(
                    (item: any) =>
                      item?.toLowerCase() === selectSkill?.toLowerCase()
                  )
                ) {
                  return;
                }
                setRegisterReqBody((prevState: any) => ({
                  ...prevState,
                  skills: [...registerReqBody?.skills, selectSkill],
                }));
              }
              setSelectSkill("");
            }}
          >
            <p className="text-desaturatedDarkCyan  text-sm">Skills:</p>
            <div className="flex gap-x-1 w-full">
              <input
                type="text"
                className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm  text-desaturatedDarkCyan flex-1 "
                value={selectSkill}
                onChange={(e) => {
                  e.preventDefault();
                  setSelectSkill(e.target.value);
                }}
              />
            </div>
            <p
              onClick={() =>
                setRegisterReqBody((prevState: any) => ({
                  ...prevState,
                  skills: [],
                }))
              }
              className={`
                cursor-pointer font-semibold text-[14px] text-desaturatedDarkCyan hover:underline`}
            >
              Clear
            </p>
          </form>
        </div>
        <div
          className={`
            mt-3 flex justify-start items-center flex-wrap gap-x-[10px] gap-y-2 px-4 my-4 w-[400px]`}
        >
          {registerReqBody?.skills?.map((skill: any, i: number) => {
            return (
              <div
                key={i}
                className={`${
                  job?.Skills?.map((item: any) => item.skill.name).includes(
                    skill
                  )
                    ? "bg-LightGrayishCyan text-desaturatedDarkCyan"
                    : "bg-gray-200 text-gray-500"
                }
                       shadow-md text-sm min-w-[90px]  h-6 overflow-hidden flex justify-between items-center rounded-sm`}
              >
                <p className="px-1 text-[13px] font">{skill}</p>
                <div
                  className={`
                    ${
                      job?.Skills?.map((item: any) => item.skill.name).includes(
                        skill
                      )
                        ? "bg-desaturatedDarkCyan text-desaturatedDarkCyan"
                        : "bg-gray-400 text-gray-500"
                    }
                  text-desaturatedDarkCyan bg-desaturatedDarkCyan hover:bg-veryDarkGraishCyan w-[20px] cursor-pointer flex justify-center items-center`}
                >
                  <RiCloseFill
                    color="white"
                    size={24}
                    onClick={() => {
                      setRegisterReqBody((prevState: any) => ({
                        ...prevState,
                        skills: registerReqBody?.skills?.filter(
                          (item: any) => item != skill
                        ),
                      }));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {registerReqBody?.skills?.length > 0 && (
          <>
            <div className="flex gap-x-1  w-[90%] mb-2">
              <p
                className={`
            cursor-pointer text-[14px] text-desaturatedDarkCyan hover:underline`}
              >
                Min. skills:
              </p>
              <div className="relative">
                <input
                  className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[50px] pl-2  h-6 text-sm  text-desaturatedDarkCyan flex-1 "
                  type="number"
                  id="amount"
                  name="amount"
                  max={100}
                  min={0}
                  value={registerReqBody?.minimumPercentagem}
                  onChange={(e) => {
                    setRegisterReqBody((prevState: any) => ({
                      ...prevState,
                      minimumPercentagem: e.target.value,
                    }));
                  }}
                />
                <p className="text-desaturatedDarkCyan font-semibold absolute top-0 right-1">
                  %
                </p>
              </div>
            </div>
          </>
        )}
        <div className={`flex w-full space-x-1`}>
          <ButtonComponent
            title={
              isNewJobIsLoading || isupdateJobIsLoading ? "Loading..." : "Save"
            }
            disabled={isNewJobIsLoading || isupdateJobIsLoading ? true : false}
            className="bg-desaturatedDarkCyan rounded-md text-sm text-white py-2 flex-1 w-[100px]"
            onClick={() => {
              if (title.includes("Create")) {
                createNewJob();
                handleCloseNewJobModal && handleCloseNewJobModal();
                setRegisterReqBody(() => ({
                  ...registerReqBody,
                }));
              } else {
                updateJobMutate();
              }
            }}
          />
          <ButtonComponent
            title="Cancel"
            disabled={isNewJobIsLoading || isupdateJobIsLoading ? true : false}
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
