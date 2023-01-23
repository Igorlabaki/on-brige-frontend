import React from "react";
import { useRouter } from "next/router";
import { ImageComponent } from "../util/image";
import { AuthModalCompoent } from "../modals/authModal";
import useModalsContext from "../../hooks/useModalsContext";
import HeaderMenu from "./menu";

export function HeaderComponent() {
  const router = useRouter();
  const { isAuthModalOpen } = useModalsContext();

  return (
    <div
      className={`
      bg-desaturatedDarkCyan w-full static  flex 
       justify-between  items-center h-[130px]`}
    >
      <div
        className="w-[90%] m-auto  flex 
       justify-between  items-center"
      >
        <ImageComponent
          src={"/images/logo/webLogo.png"}
          alt="logo brand"
          h="h-[60px]"
          w="w-[250px]"
          containerClassname="cursor-pointer"
          onclik={() => router.push("/")}
        />
        <HeaderMenu />
        {isAuthModalOpen && <AuthModalCompoent />}
      </div>
    </div>
  );
}
