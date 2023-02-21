import React, { useState } from "react";
import { useRouter } from "next/router";
import { JobComponent } from "../jobs/job";
import { CardComponent } from "../util/card";
import { BsPlusCircle } from "react-icons/BS";
import { AvatarComponent } from "../util/avatar";
import { ButtonComponent } from "../util/button";
import { FaReact, FaUserEdit } from "react-icons/fa";
import { AvatarModalComponent } from "../modals/avatarModal";
import useModalsContext from "../../hooks/useModalsContext";
import { UpadateCompanyComponent } from "./upadateCompanyInfo";
import { Job } from "../../context/contextRepositories/IJobContext";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { NewJobModalCompoent } from "../modals/newJobModal";

export function CompanyProfileComponent() {
  const { authUser } = useRecoverUserData();
  const [isEditModeTrue, setIsEditModeTrue] = useState(false);
  const {
    handleOpenAvatarModal,
    handleOpenNewJobModal,
    isAvatarModalOpen,
    isNewJobModalOpen,
  } = useModalsContext();

  function handleEditModeCLose() {
    setIsEditModeTrue(false);
  }

  function handleEditModeOpen() {
    setIsEditModeTrue(true);
  }

  return (
    <div className="mt-10">
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
            <UpadateCompanyComponent
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
              <div className="flex text-sm text-gray-400 gap-x-1">
                <p>{authUser?.email}</p>
              </div>
              {authUser?.Country && (
                <div className="flex gap-x-2 mt-1">
                  <p className="text-[15px] text-desaturatedDarkCyan">
                    Currently Location:
                  </p>
                  <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-1">
                    <p>{authUser?.Country.name}</p>,{" "}
                    <p>{authUser?.City.name}</p>
                  </div>
                </div>
              )}
              <div>
                {authUser?.about && (
                  <div className="flex flex-col  justify-center items-start w-full gap-y-2">
                    <p className="text-[15px] text-desaturatedDarkCyan">
                      About:
                    </p>
                    <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
                      {authUser.about}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardComponent>
      <div className="flex w-full justify-between items-center mt-10">
        <div className="flex gap-x-2 justify-start items-center text-desaturatedDarkCyan">
          <p className=" text-lg ">Job opportunities</p>
          <p>({authUser?.Jobs?.length || 0})</p>
        </div>
        <ButtonComponent
          type="submit"
          title={"Add new job"}
          className={`
      w-[200px] bg-desaturatedDarkCyan cursor-pointer
      shadow-lg  text-white text-sm 
        flex justify-center items-center rounded-lg  p-1  space-x-2
        `}
          icon={<BsPlusCircle size={15} />}
          onClick={(e) => {
            e.preventDefault();
            handleOpenNewJobModal && handleOpenNewJobModal();
          }}
        />
      </div>
      <div className="flex flex-col gap-5 mt-5 mb-10">
        {authUser?.Jobs?.map((job: Job) => {
          return <JobComponent job={job} key={job.id} />;
        })}
      </div>
      {isAvatarModalOpen && <AvatarModalComponent />}
      {isNewJobModalOpen && <NewJobModalCompoent />}
    </div>
  );
}
