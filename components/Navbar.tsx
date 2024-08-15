import React from 'react'
import Logo from './ui/Logo'
import AuthBtns from './ui/AuthBtns'
import { ModeToggle } from './ui/mode-btn'

const Navbar = () => {
  return (
    <div className='flex m-5 max-sm:mt-9 mx-8 items-center justify-between'>
      <Logo/>
      <div className='flex items-center justify-between gap-4'>
      <ModeToggle/>
      <AuthBtns/>
      </div>
    </div>
  )
}

export default Navbar