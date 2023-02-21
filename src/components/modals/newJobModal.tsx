import React from "react";
import { ModalComponent } from "../util/modal";
import JobDataFormComponent from "../forms/jobDataForm";
import useModalsContext from "../../hooks/useModalsContext";

interface Props {
  handleCloseNewJobModal?: () => void;
}

export function NewJobModalCompoent({ handleCloseNewJobModal }: Props) {
  return (
    <ModalComponent
      onClose={() => handleCloseNewJobModal && handleCloseNewJobModal()}
    >
      <JobDataFormComponent
        title={"Create new job"}
        onClose={handleCloseNewJobModal}
      />
    </ModalComponent>
  );
}
