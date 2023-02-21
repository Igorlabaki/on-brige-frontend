import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";

interface Props {
  percentageMatch: number;
  minimumPercentage: number;
}

export function SkillChartComponent({
  minimumPercentage,
  percentageMatch,
}: Props) {
  const { authUser } = useRecoverUserData();
  return (
    <div
      className={`
h-9 w-9 rounded-full text-sm flex justify-center items-center text-desaturatedDarkCyan shadow-lg hover:shadow-none hover:brightness-105 duration-300`}
    >
      {authUser?.userType?.includes("developer") &&
      percentageMatch >= minimumPercentage ? (
        <CircularProgressbar
          value={percentageMatch}
          text={
            <tspan dy={10} dx={-25}>
              {`${percentageMatch}%`}
            </tspan>
          }
          background={true}
          styles={{
            path: {
              stroke: "hsl(180, 29%, 50%)",
            },
            trail: {
              // Trail color
              stroke: "hsl(180, 52%, 96%)",
            },
            text: {
              // Text color
              fill: "hsl(180, 29%, 50%)",
              // Text size
              fontSize: "25px",
            },
            background: {
              fill: "hsl(180, 52%, 96%)",
            },
          }}
          className="bg-LightGrayishCyan rounded-full text-de flex justify-center items-center"
        />
      ) : authUser?.userType?.includes("developer") ? (
        <CircularProgressbar
          value={percentageMatch}
          text={
            <tspan dy={10} dx={-25}>
              {`${percentageMatch}%`}
            </tspan>
          }
          background={true}
          styles={{
            path: {
              stroke: "#c32a2a",
            },
            trail: {
              // Trail color
              stroke: "#f8deda  ",
            },
            text: {
              // Text color
              fill: "#dd1a1a",
              // Text size
              fontSize: "30px",
            },
            background: {
              fill: "#f8deda",
            },
          }}
          className="bg-LightGrayishCyan rounded-full text-center"
        />
      ) : null}
    </div>
  );
}
