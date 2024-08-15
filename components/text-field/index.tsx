// ** React Import
import { forwardRef } from 'react'

// ** MUI Imports
import styled from "@emotion/styled";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  alignItems: "flex-start",
  "& .MuiInputLabel-root": {
    transform: "none",
    lineHeight: 1.154,
    position: "relative",
    marginBottom: `var(--spacing-1)`,
    fontSize: "var(--font-size-body2)",
    color: "var(--foreground) !important",
  },
  "& .MuiInputBase-root": {
    borderRadius: "var(--radius)",
    backgroundColor: "transparent !important",
    border: `1px solid var(--border)`,
    transition: "var(--transition-default)",
    "&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover": {
      borderColor: "var(--border-hover)",
    },
    "&:before, &:after": {
      display: "none",
    },
    "&.MuiInputBase-sizeSmall": {
      borderRadius: "calc(var(--radius) - 0.125rem)",
    },
    "&.Mui-error": {
      borderColor: "var(--destructive)",
    },
    "&.Mui-focused": {
      boxShadow: "var(--shadow-focused)",
      "& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder": {
        transform: "translateX(4px)",
      },
      "&.MuiInputBase-colorPrimary": {
        borderColor: "var(--primary)",
      },
      "&.MuiInputBase-colorSecondary": {
        borderColor: "var(--secondary)",
      },
      "&.MuiInputBase-colorInfo": {
        borderColor: "var(--info)",
      },
      "&.MuiInputBase-colorSuccess": {
        borderColor: "var(--success)",
      },
      "&.MuiInputBase-colorWarning": {
        borderColor: "var(--warning)",
      },
      "&.MuiInputBase-colorError": {
        borderColor: "var(--destructive)",
      },
      "&.Mui-error": {
        borderColor: "var(--destructive)",
      },
    },
    "&.Mui-disabled": {
      backgroundColor: "var(--muted) !important",
    },
    "& .MuiInputAdornment-root": {
      marginTop: "0 !important",
    },
  },
  "& .MuiInputBase-input": {
    color: "var(--foreground)",
    "&:not(textarea)": {
      padding: "15.5px 13px",
    },
    "&:not(textarea).MuiInputBase-inputSizeSmall": {
      padding: "7.5px 13px",
    },
    "&:not(.MuiInputBase-readOnly):not([readonly])::placeholder": {
      transition: "var(--transition-default)",
    },
    "&.MuiInputBase-inputAdornedStart:not(.MuiAutocomplete-input)": {
      paddingLeft: 0,
    },
    "&.MuiInputBase-inputAdornedEnd:not(.MuiAutocomplete-input)": {
      paddingRight: 0,
    },
  },
  "& .MuiFormHelperText-root": {
    lineHeight: 1.154,
    margin: "var(--spacing-1) 0 0",
    color: "var(--muted-foreground)",
    fontSize: "var(--font-size-body2)",
    "&.Mui-error": {
      color: "var(--destructive)",
    },
  },
  "& .MuiSelect-select:focus, & .MuiNativeSelect-select:focus": {
    backgroundColor: "transparent",
  },
  "& .MuiSelect-filled .MuiChip-root": {
    height: 22,
  },
  "& .MuiAutocomplete-input": {
    paddingLeft: "6px !important",
    paddingTop: "7.5px !important",
    paddingBottom: "7.5px !important",
    "&.MuiInputBase-inputSizeSmall": {
      paddingLeft: "6px !important",
      paddingTop: "2.5px !important",
      paddingBottom: "2.5px !important",
    },
  },
  "& .MuiAutocomplete-inputRoot": {
    paddingTop: "8px !important",
    paddingLeft: "8px !important",
    paddingBottom: "8px !important",
    "&:not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart": {
      paddingLeft: "13px !important",
    },
    "&.MuiInputBase-sizeSmall": {
      paddingTop: "5px !important",
      paddingLeft: "5px !important",
      paddingBottom: "5px !important",
      "& .MuiAutocomplete-tag": {
        margin: 2,
        height: 22,
      },
    },
  },
  "& .MuiInputBase-multiline": {
    padding: "15.25px 13px",
    "&.MuiInputBase-sizeSmall": {
      padding: "7.25px 13px",
    },
    "& textarea.MuiInputBase-inputSizeSmall:placeholder-shown": {
      overflowX: "hidden",
    },
  },
  "& + .react-datepicker__close-icon": {
    top: 11,
    "&:after": {
      fontSize: "1.6rem !important",
    },
  },
}));



const CustomTextField = forwardRef((props: TextFieldProps, ref) => {
  // ** Props
  const { size = 'small', InputLabelProps, ...rest } = props

  return (
    <TextFieldStyled
      size={size}
      inputRef={ref}
      {...rest}
      variant='filled'
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
    />
  )
})

export default CustomTextField
