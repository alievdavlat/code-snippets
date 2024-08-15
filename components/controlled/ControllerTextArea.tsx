import React from "react";
import { Control, Controller, FieldErrors, FieldError } from "react-hook-form";
import { TextFieldProps } from "@mui/material/TextField";

type TextAreaFieldProps = {
  name: string;
  label?: string;
  placeholder: string;
  control?: Control;
  error?: FieldErrors | FieldError;
  inputProps?: TextFieldProps;
  type?: string;
  icon?: string;
  rows?: number;
  className?: string;
  onMouseEnter?:() => any
  onMouseLeave?:() => any
};
const ControllerTextArea = (props: TextAreaFieldProps) => {
  const {  name, placeholder, control, className, rows } = props;

  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field }) => (
        <textarea
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          placeholder={placeholder.toString()}
          defaultValue={""}
          value={field.value}
          onChange={(e: any) => field.onChange(e.target.value)}
          rows={rows}
          className={className}
        />
      )}
    />
  );
};

export default ControllerTextArea;
