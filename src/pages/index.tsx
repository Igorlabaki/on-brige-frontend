import { useState, useEffect } from "react";
import JobListComponent from "../components/jobs";
import { LayoutComponent } from "../components/layout";
import { ButtonComponent } from "../components/util/button";
import CompaniesListComponent from "../components/companies";
import DeveloperListComponent from "../components/developer";
import { useRecoverUserData } from "../hooks/auth/recoveryUserData";

export default function Home() {
  const [listMode, setlistMode] = useState<"jobs" | "companies" | "developers">(
    "jobs"
  );
  const { authUser } = useRecoverUserData();

  return (
    <LayoutComponent>
      <div className="flex gap-x-1 mt-3 w-full">
        <ButtonComponent
          title="Companies"
          onClick={() => setlistMode("companies")}
          className={`${
            listMode.includes("companies") ? "shadow-lg" : "opacity-50 "
          }
          min-w-[100px] bg-desaturatedDarkCyan py-1 w-[50%] px-2 text-white  text-md rounded-md hover:opacity-80`}
        />
        <ButtonComponent
          title="Jobs"
          onClick={() => setlistMode("jobs")}
          className={`${listMode.includes("jobs") ? "shadow-lg" : "opacity-50 "}
          min-w-[100px] bg-desaturatedDarkCyan py-1 w-[50%] px-2 text-white  text-md rounded-md hover:opacity-80`}
        />
        <ButtonComponent
          title="Developers"
          onClick={() => {
            setlistMode("developers");
          }}
          className={` ${
            listMode.includes("developers") ? "shadow-lg" : "opacity-50"
          }
          min-w-[100px] bg-desaturatedDarkCyan w-[50%] py-1 px-2 text-white  text-md rounded-md
          hover:opacity-80
          `}
        />
      </div>
      {listMode.includes("jobs") && <JobListComponent />}
      {listMode.includes("companies") && <CompaniesListComponent />}
      {listMode.includes("developer") && <DeveloperListComponent />}
    </LayoutComponent>
  );
}
