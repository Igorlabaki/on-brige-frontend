import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/BS";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import useDeveloperApplied from "../../hooks/job/useDeveloperApplied";
import useDeveloperDismiss from "../../hooks/job/useDeveloperDismiss";
import { ButtonComponent } from "../util/button";
import { SkillChartComponent } from "./skillChart";

interface Props {
  jobId: string;
  userJob?: any;
  userApproved: boolean;
  percentageMatch: number;
  minimumPercentagem: number;
  handleOpenSkillMatchModal?: () => void;
}

export function ApplyCardComponent({
  userApproved,
  handleOpenSkillMatchModal,
  minimumPercentagem,
  percentageMatch,
  jobId,
  userJob,
}: Props) {
  const { authUser } = useRecoverUserData();
  const { developerAppliedMutate } = useDeveloperApplied(jobId, authUser?.id);
  const { developerDismissMutate } = useDeveloperDismiss(jobId, authUser?.id);

  const [dismissButton, setDismissButton] = useState(userJob ? true : false);
  const [buttonAppliedText, setButtonAppliedText] = useState<
    "Applied" | "Dismiss"
  >("Applied");

  console.log(
    userApproved,
    handleOpenSkillMatchModal,
    minimumPercentagem,
    percentageMatch,
    jobId,
    userJob
  );

  return (
    <div
      className={`w-full  lg:w-[350px]  flex justify-start  rounded-lg items-center gap-x-3 px-3 mt-2 
        ${authUser?.userType === "developer" ? "flex" : "hidden"}
        ${userApproved ? `bg-green-50 shadow-md` : `bg-red-100 shadow-md`}
      `}
    >
      <div>
        <ButtonComponent
          title={userJob ? buttonAppliedText : "Apply"}
          disabled={percentageMatch <= minimumPercentagem ? true : false}
          onClick={() => {
            if (!userJob) {
              developerAppliedMutate();
            }

            if (buttonAppliedText === "Dismiss") {
              developerDismissMutate();
            }
          }}
          onMouseOver={() => setButtonAppliedText("Dismiss")}
          onMouseOut={() => setButtonAppliedText("Applied")}
          className={`flex justify-center items-center gap-x-1
          ${authUser?.userType === "company" ? "hidden" : "flex"} 
          ${
            userApproved
              ? "bg-desaturatedDarkCyan text-white cursor-pointer hover:scale-105 duration-300 shadow-lg hover:shadow-none"
              : "bg-gray-100 text-gray-400 "
          } 

          ${userJob && "bg-transparent text-desaturatedDarkCyan shadow-none "}


          ${userJob && "hover:bg-red-100 hover:text-red-800 duration-300"}
          text-sm font-sans font-semibold rounded-md px-[60px] py-1 my-2  `}
          icon={
            buttonAppliedText === "Applied" && userJob ? (
              <BsCheckCircle className="text-sm text-green-700 font-bold" />
            ) : buttonAppliedText === "Dismiss" && userJob ? (
              <AiOutlineCloseCircle className="text-red-800 font-semibold " />
            ) : null
          }
        />
      </div>
      {userApproved ? (
        <div className="flex gap-x-1 items-center">
          <p className="text-sm text-green-700 font-semibold">Match</p>
          <BsCheckCircle className="text-sm text-green-700 font-bold" />
        </div>
      ) : (
        <div className="flex gap-x-1 items-center">
          <p className="text-red-800 font-semibold ">{`Match`}</p>
          <AiOutlineCloseCircle className="text-red-800 font-semibold " />
        </div>
      )}
      <div
        className="cursor-pointer"
        onClick={() => handleOpenSkillMatchModal && handleOpenSkillMatchModal()}
      >
        <SkillChartComponent
          percentageMatch={percentageMatch}
          minimumPercentage={minimumPercentagem}
        />
      </div>
    </div>
  );
}

/* ${userApproved ? `bg-green-50 shadow-md` : `bg-red-100 shadow-md`} */
