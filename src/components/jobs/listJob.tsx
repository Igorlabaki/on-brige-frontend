import React from "react";
import { JobComponent } from "./job";
import { LoadingListComponent } from "../util/loadingList";
import useGetListJobs from "../../hooks/job/useGetListCompanies";
import { Job } from "../../context/contextRepositories/IJobContext";

export function ListJobComponent() {
  const { listJobs, listJobsIsLoading } = useGetListJobs();

  if (listJobsIsLoading) {
    return <LoadingListComponent />;
  }

  return (
    <div className="flex flex-col gap-5">
      {listJobs?.map((job: Job) => {
        return <JobComponent job={job} key={job.id} />;
      })}
    </div>
  );
}
