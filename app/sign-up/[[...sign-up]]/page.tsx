"use client"
import { SignUp } from '@clerk/clerk-react'
import React from 'react'


const SIgnUpPage = () => {
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <SignUp/>
    </div>
  )
}


export default SIgnUpPage