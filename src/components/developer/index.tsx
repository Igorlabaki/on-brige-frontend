import React from "react";
import { ListDeveloper } from "./listDeveloper";

export default function DeveloperListComponent() {
  return (
    <div
      className={`flex flex-col flex-1 min-h-screen space-y-16 md:space-y-2 mt-9
      py-5 md:py-0 my-7  md:my-0 md:mt-8`}
    >
      <ListDeveloper />
    </div>
  );
}
