import React, { useState } from "react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { ModalComponent } from "../util/modal";
import useModalsContext from "../../hooks/useModalsContext";
import { useDeleteJob } from "../../hooks/job/useDeletedJobById";
import { MdDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  job: any;
  handleCloseJobMenuModal: () => void;
  handleOpenUpdateJobModal: () => void;
}

export default function JobMenuModal({
  job,
  handleOpenUpdateJobModal,
  handleCloseJobMenuModal,
}: Props) {
  const { push } = useRouter();
  const { jobDeletedMutate } = useDeleteJob(job?.id);

  return (
    <ModalComponent
      onClose={() => handleCloseJobMenuModal && handleCloseJobMenuModal()}
      styleExternal={`absolute bg-black`}
      styleInternal={`bg-white absolute top-[1rem] right-[1rem] rounded-b-md rounded-tl-md overflow-hidden shadow-lg`}
    >
      <div
        className="
            bg-white
            flex justify-center items-start flex-col relative
            h-full w-[200px]
            text-sm  text-desaturatedDarkCyan
        "
      >
        <ul className="w-full">
          <li
            className="cursor-pointer flex justify-start items-start gap-3 
                     hover:bg-gray-100 w-full h-full 
                     py-2 px-3"
            onClick={() => {
              handleOpenUpdateJobModal && handleOpenUpdateJobModal();
              handleCloseJobMenuModal && handleCloseJobMenuModal();
            }}
          >
            <p className={`flex gap-x-3`}>
              <AiFillEdit
                size={20}
                className={"text-blue-300 hover:text-blue-500 duration-500"}
              />
              Edit
            </p>
          </li>
          <li
            className="cursor-pointer flex justify-start items-start gap-x-3
                     hover:bg-gray-100 w-full h-full 
                     py-2 px-3"
            onClick={() => {
              jobDeletedMutate();
            }}
          >
            <MdDelete size={20} className={`text-red-300`} />
            <p>Delete</p>
          </li>
        </ul>
      </div>
    </ModalComponent>
  );
}
