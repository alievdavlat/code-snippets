"use client"
import React, { createContext, useState } from 'react'

export const RandomContext = createContext<any>(null)

export const RandomProvider = ({ children }:{children:React.ReactNode}) => {
  const [random, setRandom] = useState<any>(Math.random())
  
  const value:any = {
    random,
    setRandom
  }
  
  return <RandomContext.Provider value={value}>{children}</RandomContext.Provider>
}


