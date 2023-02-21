import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { FaReact } from "react-icons/fa";
import { LayoutComponent } from "../../components/layout";
import { LinksComponent } from "../../components/myProfile/links";
import { AvatarComponent } from "../../components/util/avatar";
import { CardComponent } from "../../components/util/card";
import { SkillsComponent } from "../../components/util/skills";
import useGetDeveloperById from "../../hooks/developer/useGetDeveloperById";

export default function DeveloperPage() {
  const {
    query: { developerId },
    push,
  } = useRouter();

  const { developerById, developerByIdIsLoading } =
    useGetDeveloperById(developerId);
  return (
    <LayoutComponent>
      <CardComponent>
        <div className="absolute top-[3.5rem] md:relative md:top-0">
          <AvatarComponent
            onClick={() => {}}
            avatar={developerById?.avatar}
            entityName={"developer"}
            icon={
              <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
            }
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center  space-x-4 w-full">
            <p className="text cursor-pointer    text-[20px] md:text-[20px] text-desaturatedDarkCyan">
              {developerById?.name}
            </p>
            <div className="text-sm hidden lg:flex">
              <SkillsComponent
                noCheck={true}
                skills={developerById?.Skills?.map((item: any) => {
                  return item.skill.name;
                })}
                borderSkills={true}
              />
            </div>
          </div>
          <div className="flex justify-start items-center gap-x-2 text-[25px] font-semibold">
            <p>{developerById?.level?.name}</p>
            <p>{developerById?.Area?.name}</p>
          </div>
          <div className="flex text-sm text-gray-400 gap-x-1">
            <p>{developerById?.email}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <div className={`w-full flex justify-between items-center`}>
                {developerById?.Country && (
                  <div className="flex space-x-2 text-[13px] text-darkGrayishYan font-semibolds w-[50%]">
                    <p> {developerById?.Country?.name}</p>
                    <p>{developerById.City && "/"}</p>
                    <p> {developerById?.City?.name}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="overflow-hidden w-full">
              <div>
                {developerById?.about && (
                  <div className="flex flex-col  justify-center items-start w-full gap-y-2 mt-3">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-[15px] text-desaturatedDarkCyan font-semibold">
                        Bio:
                      </p>
                      <LinksComponent user={developerById} />
                    </div>
                    <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] rounded-md flex justify-start text-md px-5 py-1 spa text-[16px] font-normal">
                      {developerById.about}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardComponent>
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
