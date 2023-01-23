import React from "react";
import { ListJobComponent } from "./listJob";

export default function JobListComponent() {
  return (
    <div
      className={`flex flex-col flex-1 min-h-screen gap-y-16 md:gap-y-10 mt-9 h-screen h-min-full
  py-5 md:py-0 my-7  md:my-0 md:mt-8`}
    >
      <ListJobComponent />
    </div>
  );
}
