// @ts-nocheck
import React, { Dispatch, memo, SetStateAction, useEffect, useMemo } from "react";
import Select from "react-select";
import { FormHelperText, InputLabel } from "@mui/material";

interface ChildProps {
  onChange: Dispatch<SetStateAction<{}>>;
  options: any[];
  value: any;
  multiple?: boolean;
  label: string;
  disabled?: boolean;
  getOptionLabel: (option: any) => string;
  filterOption?: (option: any, inputValue: string) => boolean;
  getValue: (option: any) => string;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  onSelect?: (data: any) => void;
  placeholder?: string;
}

const ChildAutocomplete = (props: ChildProps) => {
  const getValue = useMemo(() => {
    const isArray = Array.isArray(props?.value);

      if (props.multiple) {
        return isArray
          ? props.options?.filter((item: any) =>
              props?.value?.some((el: any) => el == props.getValue(item))
            )
          : [];
      } else {
        return !!props?.value
          ? props.options?.find((item) => props.getValue(item) == props?.value)
          : null;
      }
  }, [props]);

  useEffect(() => {
      if (props.multiple) {
        if (!getValue) {
          props.onChange([]);
        }
      } else {
        if (!getValue) {
          props.onChange(null);
        }
      }
  }, [props, props.multiple, getValue]);

  const getCssVariable = (variable: string): string =>
    getComputedStyle(document.documentElement).getPropertyValue(variable);

  const colorStyles = {
    control: (style, state) => ({
      ...style,
      alignItems: "flex-start",
      padding: 0,
      borderRadius: "var(--radius)",
      backgroundColor: "transparent",
      borderColor: state.isFocused
        ? `hsl(${getCssVariable("--ring")})`
        : `hsla(${getCssVariable("--ring")}, 0.2)`,
      boxShadow: state.isFocused
        ? `0 0 0 2px hsla(${getCssVariable("--ring")}, 0.2)`
        : null,
      "&:hover": {
        borderColor: state.isFocused
          ? `hsl(${getCssVariable("--ring")})`
          : `hsla(${getCssVariable("--ring")}, 0.28)`,
      },
      width: "100%", // Selectning kengligini 100% qilish
    }),
    option: (style, state) => ({
      ...style,
      color: state.isSelected
        ? getCssVariable("--primary-foreground")
        : getCssVariable("--foreground"),
      backgroundColor: state.isSelected
        ? `hsl(${getCssVariable("--primary")})`
        : undefined,
      "&:hover": {
        backgroundColor: state.isSelected
          ? `hsl(${getCssVariable("--primary")})`
          : `hsl(${getCssVariable("--muted")})`,
      },
    }),
    placeholder: (style) => ({
      ...style,
      color: `hsl(${getCssVariable("--muted-foreground")})`,
    }),
    singleValue: (style) => ({
      ...style,
      color: `hsl(${getCssVariable("--foreground")})`,
    }),
    menu: (style) => ({
      ...style,
      borderRadius: "var(--radius)",
      boxShadow: `0 2px 10px hsla(${getCssVariable("--foreground")}, 0.1)`,
      backgroundColor: `hsl(${getCssVariable("--background")})`, // Menyu fonini dark mode uchun o'zgartirish
      padding: 0, // Menyuda padding bo'lmasligi kerak
    }),
    multiValue: (style) => ({
      ...style,
      backgroundColor: `hsl(${getCssVariable("--muted")})`,
      borderRadius: "var(--radius)",
    }),
    multiValueLabel: (style) => ({
      ...style,
      color: `hsl(${getCssVariable("--foreground")})`,
    }),
    multiValueRemove: (style) => ({
      ...style,
      color: `hsl(${getCssVariable("--foreground")})`,
      "&:hover": {
        backgroundColor: `hsl(${getCssVariable("--destructive")})`,
        color: `hsl(${getCssVariable("--destructive-foreground")})`,
      },
    }),
    input: (style) => ({
      ...style,
      color: `hsl(${getCssVariable("--foreground")})`,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <form style={{ height: "100%", width: "100% !important" }}>
      <InputLabel id="aria-label" htmlFor="aria-example-input" sx={{ mb: 1 }}>
        {props.label}
      </InputLabel>
      <Select
        aria-labelledby="aria-label"
        inputId="aria-example-input"
        name="aria-live-color"
        placeholder={props?.placeholder}
        classNamePrefix="select"
        defaultValue={props.value}
        menuPortalTarget={document.body}
        isDisabled={props.disabled}
        isLoading={props.isLoading}
        isMulti={props.multiple}
        inputValue={props.search}
        onInputChange={(e) => props.setSearch && props.setSearch(e)}
        value={getValue}
        getOptionValue={props.getValue}
        getOptionLabel={props.getOptionLabel}
        filterOption={props.filterOption}
        onChange={(e) => {
          if (e === null) {
            props.onChange(props.multiple ? [] : 0);
          } else {
            props.multiple
              ? props?.onChange(e.map((item: any) => props.getValue(item)))
              : props?.onChange(props.getValue(e));
          }
          if (props.onSelect) {
            props.onSelect(e);
          }
        }}
        isClearable
        isSearchable={true}
        options={props.options}
        styles={colorStyles}
      />
      {props.error && (
        <FormHelperText error id="my-helper-text">
          {props.error?.message}
        </FormHelperText>
      )}
    </form>
  );
};
export default memo(ChildAutocomplete);
