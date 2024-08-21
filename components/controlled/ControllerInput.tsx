import React from "react";
import { TextFieldProps } from "@mui/material/TextField";

type CategoryInput = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  value:any,
  onchange?:(e: any) => void
};

const ControllerInput: React.FC<CategoryInput> = ({
  name,
  label,
  placeholder,
  type,
  disabled,
  value, 
  onchange
}) => {
  return (
   
        <input
          name={name}
          disabled={disabled}
          placeholder={placeholder.toString()}
          type={type}
          value={value}
          onChange={onchange}
          className="w-full p-2 hover:border-primary border dar:border-slate-300 border-slate-400 border-r-[10px] bg-transparent dark:text-white text-slate-500 active:border-primary focus:border-primary outline-none"

        />
  );
};

export default ControllerInput;
