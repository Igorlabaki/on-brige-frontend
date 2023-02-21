import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { ModalComponent } from "../util/modal";
import { api } from "../../service/axios";
import { ImageComponent } from "../util/image";
import { ButtonComponent } from "../util/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { destroyCookie, parseCookies } from "nookies";
import useModalsContext from "../../hooks/useModalsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { useCloudinaryCompanyAvatar } from "../../hooks/company/useCloudinaryCompanyAvatar";
import { useUpadateAvatarCompany } from "../../hooks/company/useUpdateCompanyAvatar";
import { useUpadateAvatarDeveloper } from "../../hooks/developer/useUpdateDeveloperAvatar";

export function AvatarModalComponent() {
  const { authUser } = useRecoverUserData();
  const { handleCloseAvatarModal } = useModalsContext();

  const { urlAvatarMutate, avatarUrl } = useCloudinaryCompanyAvatar();
  const { companyAvatarMutate, companyAvatarIsLoading } =
    useUpadateAvatarCompany();
  const { devloperAvatarMutate, devloperAvatarIsLoading } =
    useUpadateAvatarDeveloper();

  return (
    <ModalComponent
      onClose={() => handleCloseAvatarModal && handleCloseAvatarModal()}
    >
      <div
        className="bg-white  flex justify-start items-center flex-col relative h-auto space-y-10
            py-10 rounded-lg overflow-hidden px-10
           "
      >
        <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
          <IoIosClose
            size={25}
            className={"text-desaturatedDarkCyan cursor-pointer"}
            onClick={() => handleCloseAvatarModal && handleCloseAvatarModal()}
          />
        </div>
        {avatarUrl ? (
          <ImageComponent
            alt="user avatar"
            h="h-[250px]"
            w="w-[250px]"
            src={avatarUrl.url}
            containerClassname={"rounded-full overflow-hidden"}
          />
        ) : authUser?.avatar ? (
          <ImageComponent
            alt="user avatar"
            h="h-[250px]"
            w="w-[250px]"
            src={authUser?.avatar}
            containerClassname={"rounded-full overflow-hidden"}
          />
        ) : (
          <div className="bg-gray-300 rounded-full p-5">
            <FaReact size={80} className={"text-gray-800"} />
          </div>
        )}
        <div className="relative">
          <div className="flex justify-center items-center">
            <MdOutlineAddAPhoto
              size={40}
              className={
                "text-desaturatedDarkCyan cursor-pointer hover:brightness-125"
              }
            />
          </div>
          <input
            type="file"
            className="absolute top-0 left-5 w-full h-full opacity-0 cursor-pointer "
            onChange={(e) => {
              if (e.target.files) {
                urlAvatarMutate(e.target.files[0]);
              }
            }}
          />
          <div className="flex justify-center items-center gap-1 mt-2">
            <p className="text-darkGrayishYan">File name:</p>
            {avatarUrl ? (
              <p>{avatarUrl.original_filename}</p>
            ) : (
              <p>No file choosed</p>
            )}
          </div>
        </div>
        <ButtonComponent
          title={
            companyAvatarIsLoading || devloperAvatarIsLoading
              ? "Loading"
              : "Upload Photo"
          }
          className="bg-desaturatedDarkCyan text-white
           py-2 px-4 rounded-md mt-5 shadow-lg w-full font-semibold"
          onClick={() => {
            if (avatarUrl && authUser.userType === "company") {
              companyAvatarMutate(avatarUrl.url);
            } else {
              devloperAvatarMutate(avatarUrl.url);
            }
          }}
        />
      </div>
    </ModalComponent>
  );
}

/* {avatarUrl ? (
   <img
            alt="user avatar"
            src={avatarUrl.url}
            className={"rounded-full overflow-hidden h-[250px] w-[250px]"}
          />    
) : authUser?.avatar ? (
  <ImageComponent
    alt="user avatar"
    h="h-[250px]"
    w="w-[250px]"
    src={authUser?.avatar}
    containerClassname={"rounded-full overflow-hidden"}
  />
) : (
  <div className="bg-gray-300 rounded-full p-5">
    <FaReact size={80} className={"text-gray-800"} />
  </div>
)} */
