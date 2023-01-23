import React from "react";
import useErrors from "../../functions/useErrors";

interface InputComponentProps {
  type: string;
  field: string;
  classname?: string;
  placeholder?: string;
  value: string | undefined;
  handleChangeInput: (e: any) => void;
}

export function InputComponent({
  value,
  field,
  type,
  classname,
  placeholder,
  handleChangeInput,
}: InputComponentProps) {
  const { errors } = useErrors();

  return (
    <input
      required
      type={type ? type : "text"}
      name={field}
      className={`${
        errors.find(
          (item) => item.field.toLocaleLowerCase() === field.toLocaleLowerCase()
        ) && "border-2 border-red-300"
      } ${classname}
    outline-none border-0 bg-LightGrayishCyan h-8 rounded-lg w-full px-3 py-1
  `}
      placeholder={placeholder ? placeholder : `Enter your ${field}`}
      value={value}
      onChange={(e) => handleChangeInput(e)}
    />
  );
}
