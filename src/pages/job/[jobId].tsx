import React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { JobComponent } from "../../components/jobs/job";
import useGetjobById from "../../hooks/job/useGetJobById";
import { LayoutComponent } from "../../components/layout";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { DeveloperComponent } from "../../components/developer/developer";
import { Developer } from "../../context/contextRepositories/IDeveloperContext";

export default function DeveloperPage() {
  const {
    query: { jobId },
    push,
  } = useRouter();
  const { authUser } = useRecoverUserData();
  const { jobById, jobByIdIsLoading } = useGetjobById(jobId);

  const userSklls = authUser?.Skills?.map((item: any) => item.skill.name);

  function percentageJob() {
    let percentageMatch = 0;
    let matchSkills = jobById?.Skills?.filter(
      (item: any) => !userSklls?.includes(item.skill.name)
    );
    if (matchSkills && jobById?.Skills) {
      const x = jobById.Skills.length - matchSkills?.length;
      const skilssMatch = (x * 100) / jobById?.Skills?.length;
      percentageMatch = skilssMatch | 0;
    }

    return percentageMatch;
  }
  console.log(jobById);
  return (
    <LayoutComponent>
      <JobComponent
        job={jobById}
        key={jobById?.id}
        percentageMatch={percentageJob()}
      />
      <div
        className={`my-4 flex flex-col gap-y-3
        ${authUser?.id === jobById?.companyId ? "flex" : "hidden"}
      `}
      >
        <h1 className="w-full flex justify-start items-center text-desaturatedDarkCyan text-[20px] font-semibold">
          Applications :
        </h1>
        {jobById?.UsersJobs?.map((item: any) => {
          console.log(item?.user);
          return (
            <DeveloperComponent developer={item?.user} key={item?.user?.id} />
          );
        })}
      </div>
    </LayoutComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["auth.token"]: userToken } = parseCookies(ctx);

  if (!userToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
