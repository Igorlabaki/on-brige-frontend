import React from "react";
import { BiWorld } from "react-icons/bi";
import { ImLinkedin } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { GoMarkGithub } from "react-icons/go";
import { AiFillFacebook } from "react-icons/ai";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import { Developer } from "../../context/contextRepositories/IDeveloperContext";

interface Props {
  user?: any;
}
export function LinksComponent({ user }: Props) {
  const { authUser } = useRecoverUserData();
  return (
    <>
      {user?.Link?.length > 0 && (
        <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-3 relative">
          {user?.Link &&
            user?.Link?.map((link: any) => {
              return (
                <>
                  <div className="">
                    <div className="flex   ">
                      <a href={link.name} target="_blank" rel="noreferrer">
                        {link.name.includes("github") ? (
                          <GoMarkGithub size={20} className={"text-black"} />
                        ) : link.name.includes("linkedin") ? (
                          <ImLinkedin size={20} className={"text-blue-600"} />
                        ) : link.name.includes("instagram") ? (
                          <GrInstagram size={20} className={"text-pink-700"} />
                        ) : link.name.includes("facebook") ? (
                          <AiFillFacebook
                            size={24}
                            className={"text-blue-600"}
                          />
                        ) : (
                          <BiWorld size={25} />
                        )}
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      )}
    </>
  );
}
