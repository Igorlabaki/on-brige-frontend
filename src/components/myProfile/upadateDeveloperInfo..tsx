import React, { useState } from "react";
import { Link } from "../../Interfaces";
import { BiWorld } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import { AiFillFacebook } from "react-icons/ai";
import { ButtonComponent } from "../util/button";
import SelectItemsComponent from "../util/selectItems";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { CountryListComponent } from "../util/countryList";
import { useRecoverUserData } from "../../hooks/auth/recoveryUserData";
import useUpadateDeveloperInfo from "../../hooks/developer/useUpdateDeveloperInfo";

interface UpadateDeveloperProps {
  setWarning: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditModeClose: () => void;
}

export function UpadateDeveloperComponent({
  setWarning,
  handleEditModeClose,
}: UpadateDeveloperProps) {
  const { authUser } = useRecoverUserData();
  const [linkList, setlinkList] = useState<any[]>(authUser.Link);
  const [link, setLink] = useState<Link>({
    fk_id_user: "",
    id: "",
    name: "",
  });

  const [updateBodyRequest, setUpdateBodyRequest] = useState({
    developerId: authUser?.id,
    name: authUser?.name,
    email: authUser?.email,
    about: authUser?.about,
    level: authUser?.level?.name,
    area: authUser?.Area?.name,
    cityName: authUser?.City?.name,
    countryName: authUser?.Country?.name,
    linkList: authUser?.Link,
  });

  const {
    developerInfoIsLoading,
    developerInfoMutate,
    errorDeveloperInfo,
    error,
    isSuccess,
  } = useUpadateDeveloperInfo({
    bodyReq: updateBodyRequest,
    handleClose: handleEditModeClose,
  });

  const linkListsUserAuth = authUser.Link.map((item: Link) => item.name);

  return (
    <div className="w-full flex flex-col gap-y-3 animate-openOpacity">
      <div className="w-full flex justify-end items-center">
        <div className="flex gap-2">
          <ButtonComponent
            type="button"
            title={developerInfoIsLoading ? "Loading..." : "Save"}
            onClick={(e) => {
              e.preventDefault();
              setUpdateBodyRequest((prev: any) => ({
                ...prev,
                linkList: { ...linkList },
              }));
              developerInfoMutate();
            }}
            className={`
            ${developerInfoIsLoading && "animate-pulse"}
            bg-desaturatedDarkCyan py-1 text-white font-semibold text-[13px] rounded-md w-[100px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]`}
          />
          <ButtonComponent
            type="button"
            title="Cancel"
            onClick={() => handleEditModeClose()}
            className="bg-red-400 py-1 text-white font-semibold text-[13px] rounded-md w-[100px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <input
          placeholder={updateBodyRequest?.name || "Type company name"}
          type="text"
          className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
          value={updateBodyRequest.name}
          onChange={(e) => {
            e.preventDefault();
            setUpdateBodyRequest((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        <input
          placeholder="Type your email"
          type="email"
          className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
          value={updateBodyRequest.email}
          onChange={(e) => {
            e.preventDefault();
            setUpdateBodyRequest((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        <CountryListComponent setState={setUpdateBodyRequest} />
        <SelectItemsComponent
          title="Select your level"
          type={updateBodyRequest.level}
          field={"level"}
          setType={setUpdateBodyRequest}
          listOptions={["Intern", "Junior", "Middle", "Senior", "Specialist"]}
          handleHidden={true}
        />
        <SelectItemsComponent
          title="Select your area"
          field={"area"}
          type={updateBodyRequest.area}
          setType={setUpdateBodyRequest}
          handleHidden={true}
          listOptions={["Frontend", "Backend", "FullStack"]}
        />
        <form
          className="flex flex-col justify-center items-start w-full "
          onSubmit={(e) => {
            e.preventDefault();
            if (!updateBodyRequest.linkList) {
              setUpdateBodyRequest((prev: any) => ({
                ...prev,
                linkList: [link],
              }));
            } else {
              if (
                updateBodyRequest.linkList?.find(
                  (item: Link) =>
                    item?.name.toLowerCase() === link?.name.toLowerCase()
                )
              ) {
                return;
              }
              setUpdateBodyRequest((prev: any) => ({
                ...prev,
                linkList: [...prev.linkList, link],
              }));
            }
            setLink((prev) => ({
              ...prev,
              name: "",
            }));
          }}
        >
          <div className="flex space-x-2 w-full">
            <p className="text-desaturatedDarkCyan  text-sm">Links:</p>
            <input
              type="text"
              className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm  text-desaturatedDarkCyan"
              value={link.name}
              onChange={(e) => {
                e.preventDefault();
                setLink((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <p
              className={`
             cursor-pointer font-semibold text-[14px] text-desaturatedDarkCyan hover:underline`}
              onClick={() => {
                setUpdateBodyRequest((prev: any) => ({
                  ...prev,
                  linkList: [],
                }));
              }}
            >
              Clear
            </p>
          </div>
          <div className="w-full">
            {updateBodyRequest?.linkList.length > 0 &&
              updateBodyRequest?.linkList?.map((link: Link) => {
                return (
                  <>
                    <div
                      key={link.id}
                      className={`${
                        linkListsUserAuth.includes(link.name)
                          ? "bg-white text-veryDarkGraishCyan shadow-lg hover:border-[3px] border-LightGrayishCyan cursor-pointer"
                          : "text-gray-500 bg-gray-200"
                      }
                     w-full min-h-[50px]  
                    text-sm font-light relative py-1 px-2 rounded-md my-2 
                    flex justify-between items-center gap-3`}
                    >
                      <div className="flex gap-x-4">
                        {link.name?.includes("github") ? (
                          <GoMarkGithub size={25} />
                        ) : link.name?.includes("linkedin") ? (
                          <FaLinkedin size={30} />
                        ) : link.name?.includes("instagram") ? (
                          <FiInstagram size={30} />
                        ) : link.name?.includes("facebook") ? (
                          <AiFillFacebook size={30} />
                        ) : (
                          <BiWorld size={30} />
                        )}
                        <p>{link.name}</p>
                      </div>
                      <div className=" top-1 right-1  hover:bg-LightGrayishCyan rounded-full">
                        <IoIosClose
                          size={15}
                          className={"text-gray-500 cursor-pointer"}
                          onClick={() => {
                            setUpdateBodyRequest((prev) => ({
                              ...prev,
                              linkList: updateBodyRequest.linkList.filter(
                                (item: Link) => {
                                  return item.name != link.name;
                                }
                              ),
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </form>
        <div className="flex flex-col  justify-center items-start w-full gap-y-2">
          <p className="text-[15px] text-desaturatedDarkCyan">About:</p>
          <textarea
            className="bg-LightGrayishCyan resize-none w-full h-[200px] text-sm py-2 px-2 outline-none rounded-lg "
            placeholder={
              updateBodyRequest?.about ? "" : "Write about your compay..."
            }
            value={updateBodyRequest?.about}
            onChange={(e) =>
              setUpdateBodyRequest((prev) => ({
                ...prev,
                about: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
}
