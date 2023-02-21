import React from "react";

interface SelectItemProps {
  type: any;
  setType: any;
  field: any;
  title: string;
  flexRow?: boolean;
  listOptions: string[];
  handleHidden?: boolean;
}

export default function SelectItemsComponent({
  handleHidden,
  type,
  setType,
  listOptions,
  title,
  flexRow,
  field,
}: SelectItemProps) {
  return (
    <div
      className={`w-full flex animate-openOpacity ${
        flexRow
          ? "flex-row justify-start items-center space-x-4 flex-wrap"
          : "flex-col justify-center items-start flex-wrap"
      }   
        ${handleHidden ? "flex" : "hidden"}
    `}
    >
      <p className="text-desaturatedDarkCyan   text-sm">{title}:</p>
      <div className="flex gap-4 text-sm text-veryDarkGraishCyan font-light flex-wrap">
        {listOptions.map((item, i) => {
          return (
            <>
              <div
                className="flex justify-center items-center gap-2 cursor-pointer "
                key={i}
              >
                <div
                  className={`h-[12px] w-[12px] rounded-full
                   ${
                     type == item
                       ? "border-[1px] border-darkGrayishYan bg-desaturatedDarkCyan"
                       : "bg-gray-200"
                   }
                  `}
                  tabIndex={0}
                  onFocus={() => {
                    setType((prev: any) => ({
                      ...prev,
                      [field]: item,
                    }));
                  }}
                  onClick={() => {
                    if (item === type) {
                      setType(() => "");
                    } else {
                      setType((prev: any) => ({
                        ...prev,
                        [field]: item,
                      }));
                    }
                  }}
                />
                <p>{item[0].toUpperCase() + item.substr(1)}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
