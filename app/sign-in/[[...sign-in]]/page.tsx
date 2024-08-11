"use client"
import { SignIn } from '@clerk/nextjs'
import React from 'react'


const SIgnInPage = () => {
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <SignIn/>
    </div>
  )
}


export default SIgnInPage