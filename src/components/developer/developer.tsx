import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";
import { CardComponent } from "../util/card";
import { BiInfoCircle } from "react-icons/bi";
import { AvatarComponent } from "../util/avatar";
import { LinksComponent } from "../myProfile/links";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Developer } from "../../context/contextRepositories/IDeveloperContext";
import { SkillsComponent } from "../util/skills";

interface DeveloperComponentProps {
  developer: any;
}
export function DeveloperComponent({ developer }: DeveloperComponentProps) {
  const { push } = useRouter();
  const [infoState, setInfoState] = useState(Boolean);

  const jobSkilss = developer?.Skills?.map((item: any) => {
    return item.skill.name;
  });
  return (
    <CardComponent>
      <div
        className={` relative flex  w-full ${
          infoState ? "h-60" : "h-28"
        } transition-all duration-1000 ease-in-out`}
      >
        <div className="absolute top-[3.5rem] md:relative md:top-0">
          <AvatarComponent
            onClick={() => push(`/developer/${developer?.id}`)}
            avatar={developer?.avatar}
            entityName={"developer"}
            icon={
              <FiUser className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
            }
          />
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start w-full`}
        >
          <div className="flex justify-between items-center  space-x-4 w-full">
            <p className="text cursor-pointer    text-[20px] md:text-[20px] text-desaturatedDarkCyan">
              {developer?.name}
            </p>
            <div className="text-sm hidden lg:flex">
              <SkillsComponent
                noCheck={true}
                skills={developer?.Skills?.map((item: any) => {
                  return item?.skill?.name;
                })}
                borderSkills={true}
              />
            </div>
          </div>
          <p className="font-bold text-[20px] text-start cursor-pointer ">
            {developer?.level?.name} {developer?.Area?.name}
          </p>
          <div className="flex flex-col gap-y-2 w-full pr-3">
            <div className="flex justify-between items-center">
              <div className={`w-full flex justify-between items-center`}>
                <div className="flex space-x-1 text-[12px] text-darkGrayishYan font-semibolds w-[50%]">
                  <p> {developer?.Country?.name}</p>
                  <p>{developer?.City && "/"}</p>
                  <p> {developer?.City?.name}</p>
                </div>

                <div className="flex w-full justify-end items-center text-desaturatedDarkCyan">
                  {/*  <p className="text-desaturatedDarkCyan text-[13px] font-semibold">
                    More
                  </p> */}
                  <BiInfoCircle
                    className="text-white bg-desaturatedDarkCyan  rounded-full"
                    size={20}
                  />
                  <MdOutlineKeyboardArrowDown
                    size={16}
                    onClick={() => setInfoState(() => !infoState)}
                    className={` cursor-pointer
                  ${
                    infoState
                      ? "transition rotate-360 duration-[600ms] "
                      : "transition rotate-180 duration-[200ms]"
                  }
                `}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-hidden w-full">
              <div
                className={`transition-all duration-[1300ms]   ${
                  !infoState
                    ? "translate-y-[-200px] opacity-0"
                    : "translate-y-[0px]"
                }`}
              >
                {developer?.about && (
                  <div className="flex flex-col  justify-center items-start w-full gap-y-2 mt-3">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-[15px] text-desaturatedDarkCyan">
                        About:
                      </p>
                      <LinksComponent user={developer} />
                    </div>
                    <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
                      {developer?.about}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      <div className="flex text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2 lg:hidden">
        <SkillsComponent
          noCheck={true}
          skills={developer?.Skills?.map((item: any) => {
            return item.skill.name;
          })}
          borderSkills={true}
        />
      </div>
    </CardComponent>
  );
}
