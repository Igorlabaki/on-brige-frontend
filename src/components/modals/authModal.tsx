import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { ImageComponent } from "../util/image";
import { ModalComponent } from "../util/modal";
import { SignInFormComponent } from "../forms/signInForm";
import { SignUpFormComponent } from "../forms/signUpForm";
import useModalsContext from "../../hooks/useModalsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export function AuthModalCompoent() {
  const { handleCloseAuthModal, modeAuthModal } = useModalsContext();

  return (
    <ModalComponent
      onClose={() => handleCloseAuthModal && handleCloseAuthModal()}
    >
      <div
        className="bg-white  flex justify-start items-center flex-col relative
        rounded-lg animate-openOpacity w-[500px] py-10"
      >
        <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
          <IoIosClose
            size={25}
            className={"text-desaturatedDarkCyan cursor-pointer"}
            onClick={() => handleCloseAuthModal && handleCloseAuthModal()}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <ImageComponent
            alt="onBrige Logo"
            src="/images/logo/bgGreenLogo.png"
            h="h-[200px]"
            w="w-[200px]"
          />
          <p className="text-sm text-darkGrayishYan font-semibold w-[60%] mx-auto mt-2 ">
            Welcome to the network that connect developers and employers!
          </p>
          {modeAuthModal.includes("signIn") && <SignInFormComponent />}
          {modeAuthModal.includes("signUp") && <SignUpFormComponent />}
        </div>
      </div>
    </ModalComponent>
  );
}
