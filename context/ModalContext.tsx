"use client"
import useQueryParams from '@/hooks/useQueryParams'
import React, { createContext } from 'react'


export const ModalContext = createContext(null)

export const ModalProvider = ({ children }:{children:React.ReactNode}) => {
  const [ isOpen , setIsOpen ] = React.useState<boolean>(false)
  const query = useQueryParams()

  const toggle = () => {
      setIsOpen(!isOpen)
      if (query.has('id')) {
        query.remove('id')
      } 
      if(query.has('add')) {
        query.remove('add')
      }
        
  }

  const value:any = {
    isOpen , setIsOpen,
    toggle
  }
  
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}


