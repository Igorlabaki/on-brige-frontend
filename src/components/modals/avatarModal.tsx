import React from "react";
import useModalsContext from "../../hooks/useModalsContext";
import { ModalComponent } from "../util/modal";

export function AvatarModalComponent() {
  const { handleCloseAvatarModal } = useModalsContext();
  return (
    <ModalComponent
      onClose={() => handleCloseAvatarModal && handleCloseAvatarModal()}
    >
      <p>d</p>
    </ModalComponent>
  );
}
