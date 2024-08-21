import React, { Dispatch, memo, SetStateAction, useState } from "react";
import ChildAutocomplete from "./ChildAutocomplete";

interface IProps {
  name: string;
  label: any;
  getOptionLabel: (option: any) => string;
  getValue: (option: any) => string;
  filterOption?: (option: any, inputValue: string) => boolean;
  multiple?: boolean;
  disabled?: boolean;
  url: string;
  onSelect?: (data: any) => void;
  getData: (data: any) => any;
  placeholder?: string;
  options:any[]
  onChange:Dispatch<SetStateAction<{}>>
  onChangevalue?:any
}

function AsyncAutocomplete(props: IProps) {
  const [search, setSearch] = useState("");

  const isObject = (value: any) => {
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      return true;
    } else {
      return false;
    }
  };

  const value = (data: any) => {
    if (props.multiple) {
      if (data && isObject(data?.[0])) {
        return data?.map((item: any) => props.getValue(item));
      } else {
        return data;
      }
    } else {
      if (data && isObject(data)) {
        return props.getValue(data);
      } else {
        return data;
      }
    }
  };

  return (
    <ChildAutocomplete
      options={props.options}
      value={value(props.onChangevalue)}
      onChange={props.onChange}
      search={search}
      disabled={props.disabled}
      setSearch={(e: any) => {
        setSearch(e);
      
      }}
      filterOption={(option) => option}
      getOptionLabel={props.getOptionLabel}
      getValue={props.getValue}
      multiple={props.multiple}
      label={props.label}
      onSelect={props.onSelect}
      placeholder={props.placeholder}
    />
  );
}

export default memo(AsyncAutocomplete);
