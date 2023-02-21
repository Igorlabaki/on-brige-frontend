import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function CardComponent({ children }: Props) {
  return (
    <div
      className={`bg-gray-50 w-full rounded-lg p-[17px] flex flex-col lg:flex-row 
      hover:bg-white
        transition duration-300 hover:shadow-md  shadow-isadora md:shadow-lg 
    `}
    >
      {children}
    </div>
  );
}
