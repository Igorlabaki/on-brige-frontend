import React from "react";
import { BsFillInfoCircleFill } from "react-icons/BS";

interface WarningProps {
  text: string;
  width: string;
  bgColor: string;
  position: string;
  textColor: string;
}

export function WarningComponent({
  bgColor,
  text,
  textColor,
  width,
  position,
}: WarningProps) {
  return (
    <div
      className={`w-[${width}] shadow-lg animate-openMenu absolute ${position} flex flex-col p-4 mb-4 text-sm text-${textColor} bg-${bgColor} rounded-lg z-20`}
      role="alert"
    >
      <div className="flex justify-start items-center gap-x-2">
        <BsFillInfoCircleFill />
        <p className="font-semibold">Info alert!</p>
      </div>
      <div className="flex gap-x-2">
        <p>-</p>
        <p className="text-sm pr-2">{text}!</p>
      </div>
    </div>
  );
}
