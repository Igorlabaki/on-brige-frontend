import React from "react";
import { DeveloperComponent } from "./developer";
import { LoadingListComponent } from "../util/loadingList";
import useGetListDevelopers from "../../hooks/developer/useGetListDevelopers";
import { Developer } from "../../context/contextRepositories/IDeveloperContext";
import useSearchContext from "../../hooks/useSearchSContext";

export function ListDeveloper() {
  const { listDevelopers, listDevelopersIsLoading } = useGetListDevelopers();
  const { search } = useSearchContext();

  if (listDevelopersIsLoading) {
    return <LoadingListComponent />;
  }

  const filterUserList = listDevelopers?.filter((user: any) => {
    const list = [];
    for (let index = 0; index < search.length; index++) {
      const filterCase = user?.Skills?.map((user: any) => {
        return user?.skill?.name.toLocaleUpperCase();
      });
      if (filterCase?.includes(search[index]?.toLocaleUpperCase())) {
        list?.push(true);
      } else {
        list?.push(false);
      }
    }
    return list.every((user) => user === true);
  });

  return (
    <div className="flex flex-col gap-16  md:gap-4">
      {filterUserList?.map((developer: Developer) => {
        return <DeveloperComponent developer={developer} key={developer.id} />;
      })}
    </div>
  );
}
