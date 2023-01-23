import React, { createContext, useState } from "react";
import { IMoodalsContextRepository } from "./contextRepositories/IModalsContextRepository";

export const ModalsContext = createContext({} as IMoodalsContextRepository);

export function ModalsProvider({ children }: any) {
  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  function handleOpenAuthModal() {
    setIsAuthModalOpen(() => true);
  }

  function handleCloseAuthModal() {
    setIsAuthModalOpen(() => false);
  }
  //
  // Header modal
  const [isHeaderMenuModalOpen, setIsHeaderMenuModalOpen] =
    useState<boolean>(false);

  function handleOpenHeaderMenuModal() {
    setIsHeaderMenuModalOpen(() => true);
  }

  function handleCloseHeaderMenuModal() {
    setIsHeaderMenuModalOpen(() => false);
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

  // Avatar Modal
  const [isAvatarModalOpen, setIsOpenAvatarModal] = useState(false);

  function handleOpenAvatarModal() {
    setIsOpenAvatarModal(true);
  }
  function handleCloseAvatarModal() {
    setIsOpenAvatarModal(false);
  }

  const [modeAuthModal, setmodeAuthModal] = useState<"signIn" | "signUp">(
    "signIn"
  );
  //
  return (
    <ModalsContext.Provider
      value={{
        modeAuthModal,
        isAuthModalOpen,
        setmodeAuthModal,
        handleOpenAuthModal,
        handleCloseAuthModal,

        isHeaderMenuModalOpen,
        handleOpenHeaderMenuModal,
        handleCloseHeaderMenuModal,

        isNewJobModalOpen,
        handleOpenNewJobModal,
        handleCloseNewJobModal,

        isUpdateJobModalOpen,
        handleOpenUpdateJobModal,
        handleCloseUpdateJobModal,

        isAvatarModalOpen,
        handleOpenAvatarModal,
        handleCloseAvatarModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
