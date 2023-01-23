import React from "react";
import { CompanyComponent } from "./company";
import { LoadingListComponent } from "../util/loadingList";
import useGetListCompanies from "../../hooks/company/useGetListCompanies";
import { Company } from "../../context/contextRepositories/ICompanyContext";

export function ListCompany() {
  const { listCompanies, listCompaniesIsLoading } = useGetListCompanies();

  if (listCompaniesIsLoading) {
    return <LoadingListComponent />;
  }

  return (
    <div className="flex flex-col gap-5">
      {listCompanies?.map((company: Company) => {
        return <CompanyComponent company={company} key={company.id} />;
      })}
    </div>
  );
}
