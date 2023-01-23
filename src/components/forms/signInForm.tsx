import { ErrorAuth } from "../../Interfaces";
import { InputComponent } from "../util/input";
import { ButtonComponent } from "../util/button";
import useErrors from "../../functions/useErrors";
import React, { useEffect, useState } from "react";
import SelectItemsComponent from "../util/selectItems";
import isEmailValid from "../../functions/isEmailValid";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ISignInRequestBody, useSignIn } from "../../hooks/auth/useSignIn";
import useModalsContext from "../../hooks/useModalsContext";

export function SignInFormComponent() {
  const { errors, setError, removeError } = useErrors();
  const [showPassword, setShowPassword] = useState(false);
  const { modeAuthModal, setmodeAuthModal } = useModalsContext();
  const [userType, setUserType] = useState<"developer" | "company">();
  const [signInRequestBody, setLoginRequestBody] = useState<ISignInRequestBody>(
    {
      email: "",
      password: "",
      userType: undefined,
    }
  );
  const { isErrorAuthToken, errorAuthToken, signIn, authUserTokenIsLoading } =
    useSignIn(signInRequestBody);

  const modeSignIn = modeAuthModal.includes("signIn");

  function handleChangeInput(event: any) {
    const field = event.target.name;
    const value = event.target.value;

    setLoginRequestBody({ ...signInRequestBody, [field]: value });

    if (!value) {
      setError({ field: field, message: `${field} is required` });
    } else if (field === "email" && !isEmailValid(value)) {
      setError({ field: field, message: `This ${field} is invalid` });
    } else {
      removeError(field);
    }
  }

  useEffect(() => {
    if (isErrorAuthToken) {
      const messageError = errorAuthToken?.response?.data.message;
      setError({ field: messageError, message: messageError });
      setTimeout(() => removeError(messageError), 2000);
    }
  }, [isErrorAuthToken]);

  return (
    <div className="flex flex-col gap-y-2 w-full mt-5 relative animate-openOpacity">
      {errors.length > 0 && (
        <div
          className={`e
        bg-red-200 flex justify-center items-start 
        rounded-lg text-[12px] italic font-semibold text-red-600  py-1 px-3
        animate-openOpacity flex-col space-x-2 w-full animate-openCart
        `}
        >
          <p>Please correct the error(s) below:</p>
          {errors.map((error: ErrorAuth, index: number) => {
            return <p key={index}>- {error.message}</p>;
          })}
        </div>
      )}
      <InputComponent
        type={"email"}
        field={"email"}
        value={signInRequestBody?.email}
        handleChangeInput={handleChangeInput}
      />
      <div className="bg-LightGrayishCyan flex justify-between items-center  rounded-lg py-1">
        <InputComponent
          type={showPassword ? "text" : "password"}
          field={"password"}
          value={signInRequestBody?.password}
          classname={"shadow-none"}
          handleChangeInput={handleChangeInput}
        />
        <div
          className="text-desaturatedDarkCyan cursor-pointer px-3"
          onClick={() => setShowPassword(() => !showPassword)}
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </div>
      </div>
      <SelectItemsComponent
        title="Type account"
        field={"userType"}
        type={signInRequestBody.userType}
        setType={setLoginRequestBody}
        listOptions={["developer", "company"]}
        handleHidden={true}
      />
      <div className="">
        <div className="flex space-x-1 my-2">
          <p className="text-[13px]  font-[600] text-veryDarkGraishCyan pl-1">
            {modeSignIn
              ? "Are you new here?"
              : "Do you already have an account?"}
          </p>
          <ButtonComponent
            onClick={() => {
              if (modeSignIn && setmodeAuthModal) {
                setmodeAuthModal(() => "signUp");
                errors.splice(0, errors.length);
              } else {
                setmodeAuthModal && setmodeAuthModal("signIn");
                errors.splice(0, errors.length);
              }
            }}
            type="button"
            title={modeSignIn ? "Sign up " : "Sign in"}
            className="text-[13px] font-semibold text-desaturatedDarkCyan animate-pulse hover:font-bold"
          />
        </div>
      </div>
      <ButtonComponent
        type="submit"
        title={authUserTokenIsLoading ? `Loading...` : `Sign in`}
        disabled={errors?.length > 0 ? true : false}
        className={`
      w-[100%] bg-desaturatedDarkCyan cursor-pointer
      shadow-lg  text-white text-[1.1rem] 
        flex justify-center items-center rounded-lg space-x-2 p-2  
        ${
          errors?.length > 0 || !signInRequestBody.userType
            ? "bg-LightGrayishCyan text-gray-400"
            : "hover:scale-105 transform-all duration-300 hover:brightness-110"
        }
        `}
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      />
    </div>
  );
}
