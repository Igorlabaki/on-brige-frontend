
import Router, { useRouter } from "next/router";
import { Company } from "../context/contextRepositories/ICompanyContext";
import { Developer } from "../context/contextRepositories/IDeveloperContext";

export function handleRedirectAuthFilter(
  authUser: Developer | Company | null,
  onClick: () => void,
  handleOpenAuthModal: (() => void) | undefined
) {
  if (authUser) {
    onClick();
  } else {
    if (handleOpenAuthModal) {
      handleOpenAuthModal();
    }
  }
}
