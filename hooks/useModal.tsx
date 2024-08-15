import React from 'react'

 export const useModal = (val = false) => {

  const [ isOpen , setIsOpen ] = React.useState(val)


  const open = () => setIsOpen(true)

  const toggle = () => setIsOpen(!isOpen)

  const close = () => setIsOpen(false)



  return {
    isOpen,
    open,
    toggle,
    close
 }
}