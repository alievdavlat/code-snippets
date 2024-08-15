import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import CustomTextField from "../text-field";
import { TextFieldProps } from "@mui/material/TextField";

type CategoryInput = {
  name: string;
  label: string;
  placeholder: string;
  control?: Control;
  error?: FieldError | FieldErrors;
  inputProps?: TextFieldProps;
  type?: string;
  icon?: string;
  disabled?: boolean;
};

const ControllerInput: React.FC<CategoryInput> = ({
  name,
  label,
  placeholder,
  control,
  error,
  type,
  disabled,
}) => {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field }) => (
        <input
          disabled={disabled}
          placeholder={placeholder.toString()}
          type={type}
          className="w-full p-2 hover:border-primary border dar:border-slate-300 border-slate-400 border-r-[10px] bg-transparent dark:text-white text-slate-500 active:border-primary focus:border-primary outline-none"
          {...field}
        />
      )}
    />
  );
};

export default ControllerInput;
