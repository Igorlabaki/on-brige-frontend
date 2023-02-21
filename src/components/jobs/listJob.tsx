import React, { useState } from "react";
import { JobComponent } from "./job";
import { LoadingListComponent } from "../util/loadingList";
import useGetListJobs from "../../hooks/job/useGetListCompanies";
import { Job } from "../../context/contextRepositories/IJobContext";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import useModalsContext from "../../hooks/useModalsContext";
import useSearchContext from "../../hooks/useSearchSContext";
import SelectItemsComponent from "../util/selectItems";

export function ListJobComponent() {
  const { listJobs, listJobsIsLoading } = useGetListJobs();
  const { authUser } = useRecoverUserData();
  const { search } = useSearchContext();
  const [orderBy, setOrderBy] = useState({
    orderBy: "",
  });

  if (listJobsIsLoading) {
    return <LoadingListComponent />;
  }

  const userSklls = authUser?.Skills?.map((item: any) => item.skill.name);

  function percentageJob(list: any) {
    return list?.map((job: any) => {
      let percentageMatch = 0;
      let matchSkills = job?.Skills?.filter(
        (item: any) => !userSklls?.includes(item.skill.name)
      );
      if (matchSkills && job?.Skills) {
        const x = job.Skills.length - matchSkills?.length;
        const skilssMatch = (x * 100) / job?.Skills?.length;
        percentageMatch = skilssMatch | 0;
      }

      return { job: job, percentageMatch: percentageMatch };
    });
  }

  const filterUserList = listJobs?.filter((user: any) => {
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

  if (authUser?.userType === "developer") {
    return (
      <div className="flex flex-col gap-16  md:gap-4">
        <SelectItemsComponent
          field={"orderBy"}
          listOptions={["Skills"]}
          title={"Order By"}
          setType={setOrderBy}
          type={orderBy?.orderBy}
          handleHidden={true}
          flexRow={true}
        />
        {orderBy.orderBy === "Skills"
          ? percentageJob(listJobs)
              ?.sort((a: any, b: any) => a.percentageMatch - b.percentageMatch)
              .reverse()
              .map((item: any) => {
                return (
                  <JobComponent
                    job={item.job}
                    key={item.job.id}
                    percentageMatch={item.percentageMatch}
                  />
                );
              })
          : percentageJob(filterUserList)?.map((item: any) => {
              return (
                <JobComponent
                  job={item.job}
                  key={item.job.id}
                  percentageMatch={item.percentageMatch}
                />
              );
            })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16  md:gap-4 mb-10">
      {filterUserList?.map((job: Job) => {
        return <JobComponent job={job} key={job.id} />;
      })}
    </div>
  );
}
