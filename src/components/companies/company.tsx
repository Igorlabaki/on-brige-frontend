import { useEffect } from "react";
import { useRouter } from "next/router";
import { FaReact } from "react-icons/fa";
import { CardComponent } from "../util/card";
import { AvatarComponent } from "../util/avatar";
import { Company } from "../../context/contextRepositories/ICompanyContext";

interface companyProps {
  company: Company;
  token?: any;
}

export function CompanyComponent({ company }: companyProps) {
  const { push } = useRouter();

  useEffect(() => {}, []);

  return (
    <CardComponent>
      <div className="flex relative w-full ">
        <div className="absolute top-[3.5rem] md:relative md:top-0">
          <AvatarComponent
            onClick={() => push(`/company/${company?.id}`)}
            avatar={company?.avatar}
            entityName={"company"}
            icon={
              <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
            }
          />
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start w-full`}
        >
          <div className="flex justify-between items-center w-full">
            <p
              className="text cursor-pointer
              text-[20px] md:text-[20px] text-desaturatedDarkCyan"
            >
              {company?.name}
            </p>
            <div className="text flex justify-center items-center space-x-1 text-[13px] md:text-[16px] text-desaturatedDarkCyan">
              <p>Jobs:</p>
              <p>{company?.Jobs?.length}</p>
            </div>
          </div>
          <div className="flex space-x-1 text-[12px] text-darkGrayishYan font-semibolds">
            <p> {company?.Country?.name}</p>
            <p>{company.City && "/"}</p>
            <p> {company?.City?.name}</p>
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
