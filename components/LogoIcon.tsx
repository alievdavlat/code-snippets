import { DataObject } from '@mui/icons-material'
import React from 'react'

const LogoIcon = () => {
  return (
    <div className={`bg-primary px-[4px] flex items-center justify-center rounded-md`}>
    <DataObject sx={{fontSize:27, color:'white'}}/>
  </div>
  )
}

export default LogoIcon