import React from "react";
import { ImageComponent } from "../util/image";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderMenuModal from "../modals/headerMenu";
import useModalsContext from "../../hooks/useModalsContext";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";

export default function HeaderMenu() {
  const { authUser } = useRecoverUserData();

  const {
    handleOpenAuthModal,
    handleOpenHeaderMenuModal,
    isHeaderMenuModalOpen,
  } = useModalsContext();

  if (!authUser) {
    return (
      <p
        className="text-white text-md font-semibold cursor-pointer"
        onClick={() => handleOpenAuthModal && handleOpenAuthModal()}
      >
        Sing In
      </p>
    );
  }

  return (
    <div className="relative">
      {authUser?.avatar ? (
        <ImageComponent
          src={authUser.avatar}
          alt="User avatar"
          h="h-40px"
          w="w-40px"
          containerClassname="rounded-full"
        />
      ) : (
        <GiHamburgerMenu
          size={30}
          className={`text-white cursor-pointer`}
          onClick={() =>
            handleOpenHeaderMenuModal && handleOpenHeaderMenuModal()
          }
        />
      )}
      {isHeaderMenuModalOpen && <HeaderMenuModal />}
    </div>
  );
}
