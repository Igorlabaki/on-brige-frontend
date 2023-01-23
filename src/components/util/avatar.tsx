import React, { ReactNode } from "react";
import { handleRedirectAuthFilter } from "../../functions/authenticate";
import { useAuthContext } from "../../hooks/useAuthContext";
import useModalsContext from "../../hooks/useModalsContext";
import { ImageComponent } from "./image";

interface AvatarComponentProps {
  icon?: ReactNode;
  avatar: string | null | undefined;
  entityName: string;
  onClick: () => void;
}

export function AvatarComponent({
  avatar,
  icon,
  onClick,
}: AvatarComponentProps) {
  const { authUser } = useAuthContext();
  const { handleOpenAuthModal } = useModalsContext();
  return (
    <>
      {avatar ? (
        <ImageComponent alt="brand" src={avatar} h="h-[100px]" w="h-[1000px]" />
      ) : (
        <div
          className="
        h-16 w-16 cursor-pointer bg-gray-200 rounded-full flex 
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
