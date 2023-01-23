import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { JobComponent } from "../../components/jobs/job";
import { LayoutComponent } from "../../components/layout";
import { CardComponent } from "../../components/util/card";
import { ImageComponent } from "../../components/util/image";
import { Job } from "../../context/contextRepositories/IJobContext";
import useGetCompanyById from "../../hooks/company/useGetCompanyById";
import { LoadingCompanyDataComponent } from "../../components/companies/loadingCompanyData";

export default function UserIdPage() {
  const {
    query: { companyId },
  } = useRouter();

  const { companyById, companyByIdIsLoading } = useGetCompanyById(companyId);

  return (
    <LayoutComponent>
      {companyByIdIsLoading ? (
        <LoadingCompanyDataComponent />
      ) : (
        <div className="mt-10">
          <CardComponent>
            <div className={`absolute md:relative`}>
              {companyById?.avatar ? (
                <ImageComponent
                  alt="brand"
                  src={companyById?.avatar}
                  h="h-[100px]"
                  w="h-[1000px]"
                />
              ) : (
                <div
                  className="
            h-16 w-16 cursor-pointer bg-gray-200 rounded-full flex 
            justify-center items-center  overflow-hidden 
            md:h-20 md:w-20 mr-5 absolute bottom-[3.0rem] 
            md:relative md:bottom-0 shadow-lg
            "
                >
                  <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="w-full flex justify-between items-center text-desaturatedDarkCyan mt-12 md:mt-3">
                <p className="text-2xl text-veryDarkGraishCyan">
                  {companyById?.name}
                </p>
              </div>
              <div className="flex text-sm text-gray-400 gap-x-1">
                <p>{companyById?.email}</p>
              </div>
              {companyById?.Country && (
                <div className="flex gap-x-2 mt-1">
                  <p className="text-[15px] text-desaturatedDarkCyan">
                    Currently Location:
                  </p>
                  <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-1">
                    <p>{companyById?.Country.name}</p>,{" "}
                    <p>{companyById?.City.name}</p>
                  </div>
                </div>
              )}
              <div className="w-full">
                {companyById?.about && (
                  <div className="flex flex-col  justify-center items-start w-full gap-y-2 w-full">
                    <p className="text-[15px] text-desaturatedDarkCyan">
                      About:
                    </p>
                    <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
                      {companyById.about}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardComponent>
          <div className="flex w-full justify-between items-center mt-10">
            <div className="flex gap-x-2 justify-start items-center text-desaturatedDarkCyan">
              <p className=" text-lg ">Job opportunities</p>
              <p>({companyById?.Jobs?.length || 0})</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            {companyById?.Jobs?.map((job: Job) => {
              return <JobComponent job={job} key={job.id} />;
            })}
          </div>
        </div>
      )}
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
