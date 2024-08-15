import React from 'react'
import { Control, Controller } from 'react-hook-form'
import CustomTextField from '../text-field'
import { FormControl, FormHelperText, MenuItem } from '@mui/material'

type CategoryInput = {
  name: string
  label: string
  placeholder?: string
  control: Control
  error?: any
  data: any[]
  getLabel: (data: any) => string
  keyWord?: string
  disabled?: boolean
  onselect?: (data: any) => void
}

const ControllerSelect: React.FC<CategoryInput> = ({
  name,
  label,
  control,
  error,
  data,
  getLabel,
  keyWord,
  disabled,
  onselect
}) => {

  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={!!error?.type} fullWidth>
          
          <CustomTextField
            select
            fullWidth
            defaultValue=''
            disabled={disabled}
            label={label}
            id={'select-controlled' + name}
            SelectProps={{ value: field.value, onChange: e => field.onChange(e.target.value) }}
          >
            {data?.map(el => (
              <MenuItem key={keyWord ? el?.[keyWord] : el} value={keyWord ? el?.[keyWord] : el} onClick={() => onselect ?  onselect(keyWord ? el?.[keyWord] : el) : {}}>
                {getLabel(el)}
              </MenuItem>
            ))}
          </CustomTextField>
          {!!error?.message?.toString() ?? (
            <FormHelperText id='my-helper-text'>{error?.message?.toString() || ''}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

export default ControllerSelect
