import React from "react";
import { Job } from "../../context/contextRepositories/IJobContext";
import useModalsContext from "../../hooks/useModalsContext";
import JobDataFormComponent from "../forms/jobDataForm";
import { ModalComponent } from "../util/modal";
import { RegisterReqBody } from "./newJobModal";

interface UpdateJobProps {
  job: Job;
}

export default function UpdateJobModalComponent({ job }: UpdateJobProps) {
  const { handleCloseUpdateJobModal } = useModalsContext();

  const updateReqBody: RegisterReqBody = {
    about: job?.about,
    area: job?.area,
    cityName: job?.City?.name,
    companyId: job?.Company?.id,
    countryName: job?.Country?.name,
    level: job?.level,
    minimumPercentagem: "50",
  };

  return (
    <ModalComponent
      onClose={() => handleCloseUpdateJobModal && handleCloseUpdateJobModal()}
    >
      <JobDataFormComponent title={"Update  job"} job={updateReqBody} />
    </ModalComponent>
  );
}
