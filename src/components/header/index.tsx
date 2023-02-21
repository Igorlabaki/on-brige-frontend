import React from "react";
import { useRouter } from "next/router";
import { ImageComponent } from "../util/image";
import { AuthModalCompoent } from "../modals/authModal";
import useModalsContext from "../../hooks/useModalsContext";
import HeaderMenu from "./menu";
import { SearchComponent } from "../util/search";

export function HeaderComponent() {
  const router = useRouter();
  const { isAuthModalOpen } = useModalsContext();

  return (
    <div
      className={`
      bg-desaturatedDarkCyan w-full   flex flex-col
       justify-between  items-center h-[130px] relative mb-10`}
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
      <div className="mb-[-2rem] w-[90%]">
        <SearchComponent />
      </div>
    </div>
  );
}
