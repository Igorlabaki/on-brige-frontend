import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/BS";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import useSearchContext from "../../hooks/useSearchSContext";

interface SkillsProps {
  skills: string[];
  borderSkills?: boolean;
  noCheck?: boolean;
}

export function SkillsComponent({
  skills,
  borderSkills,
  noCheck,
}: SkillsProps) {
  const router = useRouter();

  const { search, setSearch } = useSearchContext();
  const { authUser } = useRecoverUserData();
  const [userJobMatchSkill, setUserJobMatchSkill] = useState(false);

  function userJobMatch() {
    if (router.asPath.includes("job")) {
      setUserJobMatchSkill;
    }
  }

  const skillUser = authUser?.Skills?.map((item: any) => {
    return item.skill.name;
  });

  return (
    <>
      {skills?.map((skill: string, i: number) => {
        const match = skillUser?.find(
          (item: any) =>
            item?.toLocaleLowerCase() === skill?.toLocaleLowerCase()
        );
        return (
          <div key={i} className={`z-40 flex-wrap mr-2`}>
            <div
              className={`${
                match &&
                !borderSkills &&
                "border-[1px] border-desaturatedDarkCyan"
              }
              relative min-w-[70px] font-semibold min-h-[20px] py-1 px-3 shadow-md rounded-md hover:bg-desaturatedDarkCyan 
              hover:text-white duration-500 cursor-pointer text-[12px]  flex justify-center items-center gap-2 flex-wrap 
              ${
                search.find(
                  (item: string) =>
                    item?.toLocaleLowerCase() === skill?.toLocaleLowerCase()
                )
                  ? "bg-desaturatedDarkCyan  text-white"
                  : "bg-LightGrayishCyan text-desaturatedDarkCyan font-semibold"
              }`}
              onMouseOver={() => {
                setUserJobMatchSkill(true);
              }}
              onMouseOut={() => setUserJobMatchSkill(false)}
              onClick={() => {
                if (!search) {
                  setSearch(() => [skill]);
                } else if (
                  search.find(
                    (item: string) =>
                      item?.toLocaleLowerCase() === skill?.toLocaleLowerCase()
                  )
                ) {
                  setSearch((prevState: any) =>
                    prevState.filter(
                      (item: string) =>
                        item?.toLocaleLowerCase() != skill?.toLocaleLowerCase()
                    )
                  );
                } else {
                  setSearch((prevState: any) => [...prevState, skill]);
                }
              }}
            >
              {skill}
              <div
                className={`${match && !noCheck ? "flex" : "hidden"}
                 mb-1
                 `}
              >
                <BsCheckCircle size={13} className={""} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
