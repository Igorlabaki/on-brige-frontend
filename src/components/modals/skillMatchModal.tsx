import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { ModalComponent } from "../util/modal";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { ButtonComponent } from "../util/button";
import { ApplyCardComponent } from "../jobs/applyCard";

interface Props {
  job: any;
  handleCloseSkillMatchModal: () => any;
}

export function SkillMatchCompoent({ job, handleCloseSkillMatchModal }: Props) {
  const { authUser } = useRecoverUserData();
  const userSklls = authUser?.Skills?.map((item: any) => item.skill.name);

  function percentageJob() {
    let percentageMatch = 0;
    let percentageMiss = 0;
    let missSkills = job?.Skills?.filter(
      (item: any) => !userSklls?.includes(item.skill.name)
    );
    let matchSkills = job?.Skills?.filter((item: any) =>
      userSklls?.includes(item.skill.name)
    );

    if (matchSkills && job?.Skills) {
      const x = job.Skills.length - matchSkills?.length;
      const skilssMatch = (x * 100) / job?.Skills?.length;
      percentageMiss = skilssMatch | 0;
      percentageMatch = 100 - percentageMiss;
    }

    return {
      matchSkills,
      percentageMatch,
      missSkills,
      percentageMiss,
    };
  }

  const { matchSkills, percentageMatch, missSkills, percentageMiss } =
    percentageJob();
  const userApproved = job?.minimumPercentagem <= percentageMatch;
  return (
    <ModalComponent
      onClose={() => handleCloseSkillMatchModal && handleCloseSkillMatchModal()}
    >
      <div
        className="bg-white  flex justify-start items-center flex-col relative
        rounded-lg animate-openOpacity w-[500px] py-10"
      >
        <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
          <IoIosClose
            size={25}
            className={"text-desaturatedDarkCyan cursor-pointer"}
            onClick={() =>
              handleCloseSkillMatchModal && handleCloseSkillMatchModal()
            }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-desaturatedDarkCyan font-semibold text-[20px]">
            Skills Match
          </p>
          <div className="flex gap-x-20 mt-5">
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-2">
                <p className="text-darkGrayishYan font-semibold">
                  Matched skills:
                </p>
              </div>
              <div className="flex justify-start flex-col gap-y-2">
                {matchSkills?.map((item: any) => {
                  return (
                    <>
                      <div className="text-sm font-semibold text-green-800 bg-green-100 py-1 rounded-lg">
                        <p>{item?.skill?.name}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-2">
                <p className="text-darkGrayishYan font-semibold">
                  Missing skills:
                </p>
              </div>
              <div className="flex justify-start flex-col gap-y-2">
                {missSkills?.map((item: any) => {
                  return (
                    <>
                      <div className="text-sm font-semibold text-red-800 bg-red-100 py-1 rounded-lg">
                        <p>{item?.skill?.name}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 mt-5">
            <p className="text-darkGrayishYan font-semibold">
              Minimum required:
            </p>
            <p
              className={`rounded-lg px-6 font-semibold ${
                percentageMatch >= job?.minimumPercentagem
                  ? "text-green-800 bg-green-100"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {job?.minimumPercentagem}%
            </p>
          </div>
          <div className="mt-4">
            <ApplyCardComponent
              minimumPercentagem={job?.minimumPercentagem}
              percentageMatch={percentageMatch}
              userApproved={userApproved}
              jobId={job?.id}
            />
          </div>
        </div>
      </div>
    </ModalComponent>
  );
}
