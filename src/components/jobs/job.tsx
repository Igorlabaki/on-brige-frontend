import { useState } from "react";
import { useRouter } from "next/router";
import { FaReact } from "react-icons/fa";
import { CardComponent } from "../util/card";
import { BiInfoCircle } from "react-icons/bi";
import { ImageComponent } from "../util/image";
import { SkillsComponent } from "../util/skills";
import { AvatarComponent } from "../util/avatar";
import { ApplyCardComponent } from "./applyCard";
import JobMenuModal from "../modals/jobMenuModal";
import { capitalize } from "../../functions/capitalize";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { NewJobModalCompoent } from "../modals/newJobModal";
import { SkillMatchCompoent } from "../modals/skillMatchModal";
import UpdateJobModalComponent from "../modals/updateJobModal";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { DeveloperComponent } from "../developer/developer";

interface companyProps {
  job: any;
  token?: any;
  percentageMatch?: any;
}

export function JobComponent({ job, percentageMatch }: companyProps) {
  const { push, pathname } = useRouter();

  const { authUser } = useRecoverUserData();

  const [infoState, setInfoState] = useState(Boolean);

  const userJob = authUser?.UsersJobs?.find((item: any) => {
    return item?.job?.id === job?.id;
  });

  const userApproved = job?.minimumPercentagem <= percentageMatch;

  // Job modal
  const [isUpdateJobModalOpen, setIsUpdateJobModalOpen] =
    useState<boolean>(false);

  function handleOpenUpdateJobModal() {
    setIsUpdateJobModalOpen(() => true);
  }

  function handleCloseUpdateJobModal() {
    setIsUpdateJobModalOpen(() => false);
  }
  //

  // Job  modal
  const [iJobMenuModalOpen, setIJobMenuModalOpen] = useState<boolean>(false);

  function handleOpenJobMenuModal() {
    setIJobMenuModalOpen(() => true);
  }

  function handleCloseJobMenuModal() {
    setIJobMenuModalOpen(() => false);
  }
  //

  // skillMatcth  modal
  const [iSkillMatchModalOpen, setISkillMatchModalOpen] =
    useState<boolean>(false);

  function handleOpenSkillMatchModal() {
    setISkillMatchModalOpen(() => true);
  }

  function handleCloseSkillMatchModal() {
    setISkillMatchModalOpen(() => false);
  }
  //

  // Job modal
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState<boolean>(false);

  function handleOpenNewJobModal() {
    setIsNewJobModalOpen(() => true);
  }

  function handleCloseNewJobModal() {
    setIsNewJobModalOpen(() => false);
  }
  //

  return (
    <>
      <CardComponent>
        <div
          className={`flex  w-full ${
            infoState ? "h-80" : "h-32"
          } transition-all duration-1000 ease-in-out relative z-0`}
        >
          <div
            className="w-full h-full absolute z-10"
            onClick={() => push(`/job/${job?.id}`)}
          />
          <div className="absolute top-[3.5rem] md:relative md:top-0 z-40">
            <AvatarComponent
              onClick={() => push(`/company/${job?.Company?.id}`)}
              avatar={job?.Company?.avatar}
              entityName={"developer"}
              icon={
                <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
              }
            />
          </div>
          <div
            className={` pt-3 md:pt-0 flex flex-col justify-start items-start w-full`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-between items-center  space-x-4 w-full">
                <p
                  className="text cursor-pointer    text-[20px] md:text-[20px] text-desaturatedDarkCyan z-50"
                  onClick={() => push(`/company/${job?.Company?.id}`)}
                >
                  {job?.Company?.name}
                </p>
                <div className="text-sm hidden lg:flex relative">
                  <SkillsComponent
                    noCheck={true}
                    skills={job?.Skills?.map((item: any) => {
                      return item?.skill?.name;
                    })}
                    borderSkills={true}
                  />
                </div>
              </div>
              <div
                className={`${
                  authUser?.id === job?.companyId ? "flex" : "hidden"
                } justify-start items-center  cursor-pointer gap-x-3 text-desaturatedDarkCyan relative z-50`}
              >
                <BiDotsHorizontalRounded onClick={handleOpenJobMenuModal} />
                {iJobMenuModalOpen && (
                  <JobMenuModal
                    job={job}
                    handleCloseJobMenuModal={handleCloseJobMenuModal}
                    handleOpenUpdateJobModal={handleOpenUpdateJobModal}
                  />
                )}
              </div>
            </div>
            <p className="font-bold text-[20px] text-start cursor-pointer ">
              {job?.level?.name} {job?.area?.name}
            </p>
            <div className="flex gap-x-1 text-darkGrayishYan text-[12px] ">
              <p> {capitalize(job?.Country?.name)}</p>
              <p>{job?.City && "/"}</p>
              <p> {capitalize(job?.City?.name)}</p>
            </div>
            <div
              className={`w-full flex   items-center
            ${
              authUser?.userType === "developer"
                ? "justify-between"
                : "justify-end"
            }
          `}
            >
              <div
                className={`
              ${
                authUser?.userType === "company" && !pathname.includes("job")
                  ? "flex"
                  : "hidden"
              }
              ${
                authUser?.id === job?.companyId && !pathname.includes("job")
                  ? "flex"
                  : "hidden"
              }

                justify-start items-center gap-x-2 w-[500px] relative
            `}
              >
                {job?.UsersJobs?.length > 0 && (
                  <p className="text-desaturatedDarkCyan font-semibold text-sm flex justify-start items-center">
                    {`Applications (${job?.UsersJobs?.length}): `}
                  </p>
                )}
                <div className="flex mb-3 relative">
                  {job?.UsersJobs?.slice(0, 3).map((item: any, i: number) => {
                    return (
                      <div
                        key={item?.id}
                        className={`mt-2 h-[30px] w-[30px] rounded-full cursor-pointer mr-[-0.8rem] shadow-lg relative z-50`}
                      >
                        {item?.user?.avatar ? (
                          <ImageComponent
                            alt="brand"
                            src={item?.user?.avatar}
                            h={`${"h-[30px]"}`}
                            w={`${"w-[30px]"}`}
                            imageClassname="rounded-full"
                            containerClassname="rounded-full mr-5 
                            md:relative md:bottom-0 shadow-lg cursor-pointer"
                            onclik={() => {
                              push(`/developer/${item?.user?.id}`);
                            }}
                          />
                        ) : (
                          <div
                            className="
                            h-[30px] w-[30px] cursor-pointer bg-gray-200 rounded-full flex 
                            justify-center items-center  overflow-hidden 
                            mr-5 shadow-lg"
                            onClick={() => {
                              {
                              }
                            }}
                          >
                            <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={`
            w-full justify-start  items-center text-desaturatedDarkCyan mt-2  hidden  lg:flex z-50 ${
              authUser?.userType != "developer"
                ? "flex-row-reverse "
                : "flex-row"
            }`}
              >
                <div className=" gap-x-1 flex justify-center items-center">
                  <BiInfoCircle
                    className="text-white bg-desaturatedDarkCyan  rounded-full"
                    size={20}
                  />
                  <MdOutlineKeyboardArrowDown
                    size={16}
                    onClick={() => setInfoState(() => !infoState)}
                    className={` cursor-pointer
                  ${
                    infoState
                      ? "transition rotate-360 duration-[600ms] "
                      : "transition rotate-180 duration-[200ms]"
                  }
                `}
                  />
                  {/*     <p className="text-desaturatedDarkCyan text-[13px]">More</p> */}
                </div>
              </div>
              <ApplyCardComponent
                handleOpenSkillMatchModal={handleOpenSkillMatchModal}
                minimumPercentagem={job?.minimumPercentagem}
                percentageMatch={percentageMatch}
                userApproved={userApproved}
                jobId={job?.id}
                userJob={userJob}
              />
            </div>
            <div className="overflow-hidden w-full ">
              <div
                className={`w-full flex flex-col justify-start items-start transition-all duration-[1300ms]   ${
                  !infoState ? "translate-y-[-500px]" : "translate-y-[0px]"
                }`}
              >
                <div className="flex w-full justify-between items-center mt-4 ">
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
        <div className="my-8">
          <hr className="  text-veryDarkGraishCyan" />
        </div>
        <div className="flex text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2 lg:hidden">
          <SkillsComponent
            noCheck={true}
            skills={job?.Skills?.map((item: any) => {
              return item?.skill?.name;
            })}
            borderSkills={true}
          />
        </div>
        {iSkillMatchModalOpen && (
          <SkillMatchCompoent
            job={job}
            handleCloseSkillMatchModal={handleCloseSkillMatchModal}
          />
        )}
        {isNewJobModalOpen && (
          <NewJobModalCompoent
            handleCloseNewJobModal={handleCloseNewJobModal}
          />
        )}
        {isUpdateJobModalOpen && (
          <UpdateJobModalComponent
            job={job}
            handleCloseUpdateJobModal={handleCloseUpdateJobModal}
          />
        )}
      </CardComponent>
    </>
  );
}
