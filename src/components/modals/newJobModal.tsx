import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { ErrorAuth } from "../../Interfaces";
import { ModalComponent } from "../util/modal";
import { ButtonComponent } from "../util/button";
import useErrors from "../../functions/useErrors";
import SelectItemsComponent from "../util/selectItems";
import { CountryListComponent } from "../util/countryList";
import useModalsContext from "../../hooks/useModalsContext";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import useCreateNewJob from "../../hooks/job/useCreateNewJob";
import { WarningComponent } from "../../components/util/warning";
import JobDataFormComponent from "../forms/jobDataForm";

export interface RegisterReqBody {
  about: string | undefined;
  area: string | undefined;
  level: string | undefined;
  period: string | undefined;
  cityName: string | undefined;
  companyId: string | undefined;
  countryName: string | undefined;
  minimumPercentagem: string | undefined;
}

export function NewJobModalCompoent() {
  const { handleCloseNewJobModal } = useModalsContext();

  return (
    <ModalComponent
      onClose={() => handleCloseNewJobModal && handleCloseNewJobModal()}
    >
      <JobDataFormComponent title={"Create new job"} />
    </ModalComponent>
  );
}
