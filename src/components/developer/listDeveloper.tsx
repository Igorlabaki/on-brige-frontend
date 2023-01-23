import React from "react";
import { DeveloperComponent } from "./developer";
import { LoadingListComponent } from "../util/loadingList";
import useGetListDevelopers from "../../hooks/developer/useGetListDevelopers";
import { Developer } from "../../context/contextRepositories/IDeveloperContext";

export function ListDeveloper() {
  const { listDevelopers, listDevelopersIsLoading } = useGetListDevelopers();

  if (listDevelopersIsLoading) {
    return <LoadingListComponent />;
  }

  return (
    <div className="flex flex-col gap-5">
      {listDevelopers?.map((developer: Developer) => {
        return <DeveloperComponent developer={developer} key={developer.id} />;
      })}
    </div>
  );
}
