import React from 'react'
import { Control } from 'react-hook-form'
import ControllerSelect from './ControllerSelect'
import GetContainer from '../get-container'

type CategoryInput = {
  name: string
  label: string
  placeholder?: string
  control: Control
  error?: any
  getLabel: (data: any) => string
  keyWord?: string
  url: string
  params?: any
  disabled?: boolean
  onselect?: (data: any) => void
}

const AsyncControllerSelect: React.FC<CategoryInput> = props => {
  return (
    <GetContainer url={props.url} hideLoading params={{ size: 100, page: 1, search: '', ...(props.params && props.params) }}>
      {({ data }) => <ControllerSelect data={data?.data} {...props} />}
    </GetContainer>
  )
}

export default AsyncControllerSelect
