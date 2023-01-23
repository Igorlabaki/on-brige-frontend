import React from "react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { ModalComponent } from "../util/modal";
import useModalsContext from "../../hooks/useModalsContext";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";

export default function HeaderMenuModal() {
  const { push } = useRouter();
  const { authUser } = useRecoverUserData();
  const { handleCloseHeaderMenuModal } = useModalsContext();
  return (
    <ModalComponent
      onClose={() => handleCloseHeaderMenuModal && handleCloseHeaderMenuModal()}
      styleExternal={`bg-transparent`}
      styleInternal={`bg-white absolute top-[5.5rem] right-[6.2rem] rounded-b-md rounded-tl-md overflow-hidden`}
    >
      <div
        className="
            bg-white
            flex justify-center items-start flex-col relative
            h-full w-[200px]
            text-sm  text-desaturatedDarkCyan
        "
      >
        <p className=" py-2 px-3">Hello, {authUser?.name} !</p>
        <hr className="text-darkGrayishYan w-full" />
        <ul className="w-full">
          <li
            className="cursor-pointer flex justify-start items-start gap-3
                     hover:bg-gray-100 w-full h-full  top-24
                     py-2 px-4"
          >
            <FaUserAlt size={16} />
            <p
              onClick={() => {
                push(`/myProfile`);
                handleCloseHeaderMenuModal && handleCloseHeaderMenuModal();
              }}
            >
              Profile
            </p>
          </li>
          <li
            className="cursor-pointer flex justify-start items-start gap-3
                     hover:bg-gray-100 w-full h-full 
                     py-2 px-3"
          >
            <BiLogOut size={20} />
            <p
              onClick={() => {
                destroyCookie(null, "auth.token");
                window.location.reload();
              }}
            >
              Sign out
            </p>
          </li>
        </ul>
      </div>
    </ModalComponent>
  );
}
