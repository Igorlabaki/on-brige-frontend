import React, { useState } from "react";
import { LinksComponent } from "./links";
import { CardComponent } from "../util/card";
import { AvatarComponent } from "../util/avatar";
import { FaReact, FaUserEdit } from "react-icons/fa";
import useModalsContext from "../../hooks/useModalsContext";
import { AvatarModalComponent } from "../modals/avatarModal";
import { UpadateDeveloperComponent } from "./upadateDeveloperInfo.";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { UserSkillComponent } from "./userSkill";
import { ButtonComponent } from "../util/button";
import { useUpadateSkillsDeveloper } from "../../hooks/developer/useUpdateDeveloperSkills";
import { WarningComponent } from "../util/warning";
import { UsePercentageJob } from "../../hooks/usePercentageJob";
import useGetListJobs from "../../hooks/job/useGetListCompanies";
import { JobComponent } from "../jobs/job";

export function DeveloperProfileComponent() {
  const { authUser } = useRecoverUserData();
  const userSkillList = authUser?.Skills?.map((item: any) => item?.skill?.name);
  const { listJobs, listJobsIsLoading } = useGetListJobs();
  const [warning, setWarning] = useState<boolean>(false);
  const [isEditModeTrue, setIsEditModeTrue] = useState(false);
  const userSklls = authUser?.Skills?.map((item: any) => item.skill.name);
  const [skillsList, setSkillsList] = useState<string[]>(userSkillList);
  const { handleOpenAvatarModal, isAvatarModalOpen } = useModalsContext();
  const { devloperSkillsMutate, devloperSkillsIsLoading, devloperSkills } =
    useUpadateSkillsDeveloper();

  function handleEditModeCLose() {
    setIsEditModeTrue(false);
  }

  function handleEditModeOpen() {
    setIsEditModeTrue(true);
  }

  function percentageJob(list: any) {
    return list?.map((job: any) => {
      let percentageMatch = 0;
      let matchSkills = job?.Skills?.filter(
        (item: any) => !userSklls?.includes(item.skill.name)
      );
      if (matchSkills && job?.Skills) {
        const x = job.Skills.length - matchSkills?.length;
        const skilssMatch = (x * 100) / job?.Skills?.length;
        percentageMatch = skilssMatch | 0;
      }

      return { job: job, percentageMatch: percentageMatch };
    });
  }

  return (
    <div className="mt-10 flex flex-col gap-y-5">
      <CardComponent>
        <div className="absolute top-[3.5rem] md:relative md:top-0">
          <AvatarComponent
            onClick={() => handleOpenAvatarModal && handleOpenAvatarModal()}
            avatar={authUser?.avatar}
            entityName={"developer"}
            icon={
              <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
            }
          />
        </div>
        <div className="w-full">
          {isEditModeTrue ? (
            <UpadateDeveloperComponent
              setWarning={setWarning}
              handleEditModeClose={() => handleEditModeCLose()}
            />
          ) : (
            <>
              <div className="flex justify-between items-center text-desaturatedDarkCyan mt-12 md:mt-3 w-full">
                <p className="text-2xl text-veryDarkGraishCyan">
                  {authUser?.name}
                </p>
                <FaUserEdit
                  onClick={() => handleEditModeOpen()}
                  className={`cursor-pointer`}
                />
              </div>
              <div className="flex justify-start items-center gap-x-2 text-[25px] font-semibold">
                <p>{authUser?.level?.name}</p>
                <p>{authUser?.Area?.name}</p>
              </div>
              <div className="flex text-sm text-gray-400 gap-x-1">
                <p>{authUser?.email}</p>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <div className={`w-full flex justify-between items-center`}>
                    {authUser?.Country && (
                      <div className="flex space-x-2 text-[13px] text-darkGrayishYan font-semibolds w-[50%]">
                        <p> {authUser?.Country?.name}</p>
                        <p>{authUser.City && "/"}</p>
                        <p> {authUser?.City?.name}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden w-full">
                  <div>
                    {authUser?.about && (
                      <div className="flex flex-col  justify-center items-start w-full gap-y-2 mt-3">
                        <div className="flex justify-between items-center w-full">
                          <p className="text-[15px] text-desaturatedDarkCyan font-semibold">
                            Bio:
                          </p>
                          <LinksComponent user={authUser} />
                        </div>
                        <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] rounded-md flex justify-start text-md px-5 py-1 spa text-[16px] font-normal">
                          {authUser.about}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardComponent>
      <CardComponent>
        <div className="flex flex-col gap-y-2 w-full">
          <UserSkillComponent
            editMode={isEditModeTrue}
            loadingSkillsListData={devloperSkillsIsLoading}
            setSkillsList={setSkillsList}
            skillsList={skillsList}
          />
          {skillsList?.length > 0 && !isEditModeTrue && (
            <div className="flex space-x-3 mt-5">
              <ButtonComponent
                type="button"
                title="Save"
                className="bg-desaturatedDarkCyan py-1 text-white  text-[13px] rounded-md w-[60px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
                onClick={(e) => {
                  e.preventDefault();
                  devloperSkillsMutate(skillsList);
                }}
              />
            </div>
          )}
        </div>
      </CardComponent>
      {warning && (
        <WarningComponent
          bgColor="green-200"
          text="User info update succefully"
          textColor="green-800"
          width="w-400px"
          position="top-32 right-24"
        />
      )}
      {authUser?.Skills?.length > 0 && (
        <div className="flex flex-col space-y-2 mb-2">
          <h1 className="w-full flex justify-start items-center text-desaturatedDarkCyan text-[20px] font-semibold mb-5">
            Job suggestions
          </h1>
          {percentageJob(listJobs)
            ?.sort((a: any, b: any) => a.percentageMatch - b.percentageMatch)
            .reverse()
            .slice(0, 3)
            .map((item: any) => {
              return (
                <JobComponent
                  job={item.job}
                  key={item.job.id}
                  percentageMatch={item.percentageMatch}
                />
              );
            })}
        </div>
      )}
      {isAvatarModalOpen && <AvatarModalComponent />}
    </div>
  );
}
