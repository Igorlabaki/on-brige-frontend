import React from "react";

interface WarningProps {
  textColor: string;
  bgColor: string;
  text: string;
  width: string;
}

export function WarningComponent({
  bgColor,
  text,
  textColor,
  width,
}: WarningProps) {
  return (
    <div
      className={`w-[${width}] shadow-lg animate-openMenu absolute top-4 right-24 flex p-4 mb-4 text-sm text-${textColor} bg-${bgColor} rounded-lg z-20`}
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Info alert!</span>
        <p>{text}!</p>
      </div>
    </div>
  );
}
