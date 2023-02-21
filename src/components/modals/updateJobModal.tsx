import React from "react";
import { ModalComponent } from "../util/modal";
import JobDataFormComponent from "../forms/jobDataForm";
import useModalsContext from "../../hooks/useModalsContext";
import { Job } from "../../context/contextRepositories/IJobContext";
interface UpdateJobProps {
  job: Job;
  handleCloseUpdateJobModal: () => void;
}

export default function UpdateJobModalComponent({
  job,
  handleCloseUpdateJobModal,
}: UpdateJobProps) {
  return (
    <ModalComponent
      onClose={() => handleCloseUpdateJobModal && handleCloseUpdateJobModal()}
    >
      <JobDataFormComponent
        title={`Update  job`}
        job={job}
        onClose={handleCloseUpdateJobModal}
      />
    </ModalComponent>
  );
}
