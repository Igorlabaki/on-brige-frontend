import React from "react";

interface LoadingJobProps {
  jobPage?: boolean;
}

export function LoadingJobComponent({ jobPage }: LoadingJobProps) {
  return (
    <div className="flex flex-col gap-8">
      <div
        className={` ${jobPage ? "h-64" : "h-32"}
  h-32   rounded-md w-full bg-gray-200 animate-pulse`}
      >
        <div className={`absolute `}>
          <div
            className="h-20 w-20  bg-gray-200 rounded-full flex flex-col 
      justify-center items-center relative overflow-hidden bottom-10 left-4 lg:bottom-0 lg:left-0"
          ></div>
        </div>
      </div>
      <div
        className={` ${jobPage ? "h-64" : "h-32"}
  h-32   rounded-md w-full bg-gray-200 animate-pulse`}
      >
        <div className={`absolute `}>
          <div
            className="h-20 w-20  bg-gray-200 rounded-full flex flex-col 
      justify-center items-center relative overflow-hidden bottom-10 left-4 lg:bottom-0 lg:left-0"
          ></div>
        </div>
      </div>
      <div
        className={` ${jobPage ? "h-64" : "h-32"}
  h-32   rounded-md w-full bg-gray-200 animate-pulse`}
      >
        <div className={`absolute `}>
          <div
            className="h-20 w-20  bg-gray-200 rounded-full flex flex-col 
      justify-center items-center relative overflow-hidden bottom-10 left-4 lg:bottom-0 lg:left-0"
          ></div>
        </div>
      </div>
    </div>
  );
}
