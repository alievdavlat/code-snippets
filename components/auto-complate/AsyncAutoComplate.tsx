import React, { memo, useState } from 'react'
import { Controller } from 'react-hook-form'
import ChildAutocomplete from './ChildAutocomplete'
import GetContainer from '../get-container'

interface IProps {
  control: any
  name: string
  label: any
  getOptionLabel: (option: any) => string
  getValue: (option: any) => string
  filterOption?: (option: any, inputValue: string) => boolean
  multiple?: boolean
  error: any
  disabled?: boolean
  url: string
  onSelect?: (data: any) => void
  params?: any
  autoWidth?: boolean
  onlyArray?:boolean
  onSearchChange?: (search: string) => void
  getData:(data:any) => any
  placeholder?:string
}

function AsyncAutocomplete(props: IProps) {
  const [search, setSearch] = useState('')

  const isObject = (value: any) => {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return true
    } else {
      return false
    }
  }

  
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
    <GetContainer url={props.url}   params={{ search: search, page: 1, perPage: 10000, ...props.params }} hideLoading>
      {({ data, isLoading, isFetching }) => {
        
        return (
          <Controller
            control={props.control}
            name={props.name}
            render={({ field: { ref, onChange, ...field } }) => {
              return (
                <ChildAutocomplete
                  options={props.getData(data) || []}
                  isLoading={isLoading || isFetching}
                  value={value(field?.value)}
                  onChange={onChange}
                  ref={ref}
                  search={search}
                  disabled={props.disabled}
                  setSearch={(e:any) => {
                    setSearch(e)
                    props.onSearchChange && props.onSearchChange(e)
                  }}
                  filterOption={option => option}
                  {...props}
                />
              )
            }}
          />
        )
      }}
    </GetContainer>
  )
}

export default memo(AsyncAutocomplete)
