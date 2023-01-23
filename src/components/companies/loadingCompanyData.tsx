import React from "react";

export function LoadingCompanyDataComponent() {
  return (
    <div className="flex flex-col">
      <div
        className={` h-32 mt-10
    rounded-md w-full bg-gray-200 animate-pulse`}
      >
        <div className={`absolute `}>
          <div
            className="h-20 w-20  bg-gray-200 rounded-full flex flex-col 
      justify-center items-center relative overflow-hidden bottom-10 left-4 lg:bottom-0 lg:left-0"
          ></div>
        </div>
      </div>
      <p className="mt-10 w-48 h-6 bg-gray-200" />
      <div
        className={` h-32 mt-5
    rounded-md w-full bg-gray-200 animate-pulse`}
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
