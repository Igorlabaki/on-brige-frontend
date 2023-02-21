import React, { ReactNode } from "react";
import { handleRedirectAuthFilter } from "../../functions/authenticate";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { useAuthContext } from "../../hooks/useAuthContext";
import useModalsContext from "../../hooks/useModalsContext";
import { ImageComponent } from "./image";

interface AvatarComponentProps {
  icon?: ReactNode;
  avatar: string | null | undefined;
  entityName: string;
  onClick: () => void;
  h?: string;
  w?: string;
}

export function AvatarComponent({
  h,
  w,
  icon,
  avatar,
  onClick,
}: AvatarComponentProps) {
  const { authUser } = useRecoverUserData();
  const { handleOpenAuthModal } = useModalsContext();

  return (
    <>
      {avatar ? (
        <ImageComponent
          alt="brand"
          src={avatar}
          h={`${h ? h : "h-[70px]"}`}
          w={`${w ? w : "w-[70px]"}`}
          imageClassname="rounded-full"
          containerClassname="absolute bottom-[7.0rem] rounded-full mr-5 
          md:relative md:bottom-0 shadow-lg cursor-pointer"
          onclik={() => {
            handleRedirectAuthFilter(authUser, onClick, handleOpenAuthModal);
          }}
        />
      ) : (
        <div
          className="
        h-[70px] w-[70px] cursor-pointer bg-gray-200 rounded-full flex 
        justify-center items-center  overflow-hidden 
        md:h-20 md:w-20 mr-5 absolute bottom-[3.0rem] 
        md:relative md:bottom-0 shadow-lg
        "
          onClick={() => {
            handleRedirectAuthFilter(authUser, onClick, handleOpenAuthModal);
          }}
        >
          {icon}
        </div>
      )}
    </>
  );
}
