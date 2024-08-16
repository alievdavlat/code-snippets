// ** React Imports
import { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react'


// ** Defaults

export interface TableFilterType {
  globalFilter: string
  tags:string[] | string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  setTags: Dispatch<SetStateAction<string>>
  handleTags:(title:string) => void

}

const defaultProvider = {
  globalFilter: '',
  tags: [''] || '',
  setTags: () => '',
  setGlobalFilter: () => '',
  handleTags:() => null
}

const GlobalFilter = createContext<TableFilterType>(defaultProvider)

type Props = {
  children: ReactNode
}

const GlobalFilterProvider = ({ children }: Props) => {
  // ** States
  const [globalFilter, setGlobalFilter] = useState('')
  const [tags, setTags] = useState<string>('all');

  console.log(tags);
  
  const handleTags = (title:string) => {
    
    setTags(title);
  }

  const values = {
    globalFilter,
    setGlobalFilter,
    tags,
    setTags,
    handleTags
  }
  //@ts-ignore

  return <GlobalFilter.Provider value={values}>{children}</GlobalFilter.Provider>
}

export { GlobalFilter, GlobalFilterProvider }
