import React from "react";

type TextAreaFieldProps = {
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  rows?: number;
  className?: string;
  value:any
  onchange?: (e:any) => void
};
const ControllerTextArea = (props: TextAreaFieldProps) => {
  const {  name, placeholder, className, rows , value, onchange} = props;

  return (

        <textarea
          name={name}
          placeholder={placeholder.toString()}
          value={value}
          onChange={onchange}
          rows={rows}
          required
          className={className}
        />
  
  );
};

export default ControllerTextArea;
