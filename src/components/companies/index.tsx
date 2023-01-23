import React, { useEffect } from "react";
import { ListCompany } from "./listCompany";

export default function CompaniesListComponent() {
  return (
    <div
      className={`flex flex-col flex-1 min-h-screen space-y-16 md:space-y-2 mt-9
      py-5 md:py-0 my-7  md:my-0 md:mt-8`}
    >
      <ListCompany />
    </div>
  );
}
