import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";
import { CardComponent } from "../util/card";
import { AvatarComponent } from "../util/avatar";
import { Developer } from "../../context/contextRepositories/IDeveloperContext";

interface DeveloperComponentProps {
  developer: Developer;
}
export function DeveloperComponent({ developer }: DeveloperComponentProps) {
  const { push } = useRouter();

  return (
    <CardComponent>
      <div className="flex relative ">
        <AvatarComponent
          onClick={() => push(`/developer/${developer?.id}`)}
          avatar={developer?.avatar}
          entityName={"developer"}
          icon={
            <FiUser className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
          }
        />
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start`}
        >
          <div className="flex justify-start items-center  space-x-4">
            <>
              <p className="text cursor-pointer    text-[20px] md:text-[20px] text-desaturatedDarkCyan">
                {developer?.name}
              </p>
            </>
          </div>
          <p className="font-bold text-[20px] text-start cursor-pointer ">
            {developer?.level.name} {developer?.Area?.name}
          </p>
          <div className="flex space-x-1 text-[12px] text-darkGrayishYan font-semibolds">
            <p> {developer?.Country?.name}</p>
            <p>{developer.City && "/"}</p>
            <p> {developer?.City?.name}</p>
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      {/*  <div className="flex text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2">
        <SkillsComponent
          noCheck={true}
          skills={user?.Skills?.map((item: any) => {
            return item.skill.text;
          })}
          borderSkills={true}
        />
      </div> */}
    </CardComponent>
  );
}
