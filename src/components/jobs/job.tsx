import { useState } from "react";
import { useRouter } from "next/router";
import { FaReact, FaTrash } from "react-icons/fa";
import { CardComponent } from "../util/card";
import { BiHide, BiInfoCircle } from "react-icons/bi";
import { AvatarComponent } from "../util/avatar";
import { capitalize } from "../../functions/capitalize";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Job } from "../../context/contextRepositories/IJobContext";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import useDeleteJobById from "../../hooks/job/useDeletedJobById";
import { AiFillEdit } from "react-icons/ai";
import useModalsContext from "../../hooks/useModalsContext";
import { NewJobModalCompoent } from "../modals/newJobModal";
import UpdateJobModalComponent from "../modals/updateJobModal";

interface companyProps {
  job: Job;
  token?: any;
}

export function JobComponent({ job }: companyProps) {
  const { push } = useRouter();
  const { authUser } = useRecoverUserData();
  const [infoState, setInfoState] = useState(Boolean);
  const { jobDeletedMutate } = useDeleteJobById(job.id);
  const { isNewJobModalOpen, handleOpenUpdateJobModal, isUpdateJobModalOpen } =
    useModalsContext();

  return (
    <CardComponent>
      <div className="flex relative w-full">
        <AvatarComponent
          onClick={() => push(`/company/${job?.Company?.id}`)}
          avatar={job?.Company?.avatar}
          entityName={"developer"}
          icon={
            <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
          }
        />
        <div
          className={` pt-3 md:pt-0 flex flex-col justify-start items-start w-full`}
        >
          <div className="flex justify-between items-center w-full">
            <p className="text cursor-pointer    text-[20px] md:text-[20px] text-desaturatedDarkCyan">
              {job?.Company?.name}
            </p>
            <div
              className={`${
                authUser?.id === job?.companyId ? "flex" : "hidden"
              } justify-end items-center  cursor-pointer gap-x-3`}
            >
              <AiFillEdit
                size={20}
                className={"text-blue-300 hover:text-blue-500 duration-500"}
                onClick={() => {
                  handleOpenUpdateJobModal && handleOpenUpdateJobModal();
                }}
              />
              <FaTrash
                size={15}
                className={"text-red-200 hover:text-red-500 duration-500"}
                onClick={() => {
                  jobDeletedMutate();
                }}
              />
            </div>
          </div>
          <p className="font-bold text-[20px] text-start cursor-pointer ">
            {job?.level?.name} {job?.area?.name}
          </p>
          <div className="flex gap-x-1 text-darkGrayishYan text-[12px] ">
            <p> {capitalize(job?.Country?.name)}</p>
            <p>{job.City && "/"}</p>
            <p> {capitalize(job?.City?.name)}</p>
          </div>
          <div className={`w-full flex justify-between items-center`}>
            <p
              className={`
            ${authUser?.userType === "company" ? "hidden" : "flex"} 
            text-sm bg-veryDarkGraishCyan text-white font-sans font-semibold rounded-md px-[60px] py-1 my-2 shadow-lg hover:shadow-none cursor-pointer hover:scale-105 duration-300`}
            >
              Apply
            </p>
            <div className="flex w-full justify-end items-center text-desaturatedDarkCyan">
              <BiInfoCircle
                className="text-white bg-desaturatedDarkCyan  rounded-full"
                size={20}
              />
              <MdOutlineKeyboardArrowDown
                size={20}
                onClick={() => setInfoState(() => !infoState)}
                className={` cursor-pointer
                ${
                  infoState
                    ? "transition rotate-360 duration-[600ms] "
                    : "transition rotate-180 duration-[200ms]"
                }
              `}
              />
            </div>
          </div>
          <div className="overflow-hidden w-full">
            <div
              className={`w-full flex flex-col justify-start items-start transition-all duration-1000   ${
                !infoState
                  ? "translate-y-[-200px] h-[0px]"
                  : "translate-y-[0px]"
              }`}
            >
              <div className="flex w-full justify-between items-center">
                <div className="flex justify-center items-center gap-1 text-md font-semibold text-desaturatedDarkCyan">
                  <p>Salary:</p>
                  <p className="text-[14px] text-darkGrayishYan">R$1000.00</p>
                </div>
                <div>
                  <p className="text-sm text-darkGrayishYan font-semibold">
                    {capitalize(job?.period?.name)}
                  </p>
                </div>
              </div>
              <p className="text-desaturatedDarkCyan font-semibold">
                Description:
              </p>
              <div className="w-full bg-LightGrayishCyan shadow-lg rounded-md px-3 py-3 text-justify font-league-spartan text-veryDarkGraishCyan">
                {job?.about}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="h2 my-2 text-veryDarkGraishCyan" />
      {isNewJobModalOpen && <NewJobModalCompoent />}
      {isUpdateJobModalOpen && <UpdateJobModalComponent job={job} />}
    </CardComponent>
  );
}
