export interface IMoodalsContextRepository {
  isAuthModalOpen?: boolean;
  modeAuthModal: "signIn" | "signUp"
  handleOpenAuthModal?: () => void;
  handleCloseAuthModal?: () => void;
  setmodeAuthModal?:React.Dispatch<React.SetStateAction<"signIn" | "signUp">>

  isHeaderMenuModalOpen?: boolean;
  handleOpenHeaderMenuModal?: () => void;
  handleCloseHeaderMenuModal?: () => void;

  isAvatarModalOpen?: boolean;
  handleOpenAvatarModal?: () => void;
  handleCloseAvatarModal?: () => void;

  isNewJobModalOpen?: boolean;
  handleOpenNewJobModal?: () => void;
  handleCloseNewJobModal?: () => void;

  isUpdateJobModalOpen?: boolean;
  handleOpenUpdateJobModal?: () => void;
  handleCloseUpdateJobModal?: () => void;

  iJobMenuModalOpen?: boolean;
  handleOpenJobMenuModal?: () => void;
  handleCloseJobMenuModal?: () => void;
  
  
  iSkillMatchModalOpen?: boolean;
  handleOpenSkillMatchModal?: () => void;
  handleCloseSkillMatchModal?: () => void;
}
