"use client"
import MobileSidebar from '@/components/MobileSidebar'
import ContentNote from '@/components/note/ContentNote'
import Sidebar from '@/components/sidebar'
import TopBar from '@/components/TopBar'
import React, { ReactNode } from 'react'

const Favoritelayout = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setopenSidebar] = React.useState(false);

  return (
    <div className="flex gap-4 overflow-y-hidden">
      <Sidebar />
      <MobileSidebar onClose={() => setopenSidebar(!openSidebar)} open={openSidebar}/>
      <div className="flex flex-col max-[1100px]:w-full max-md:w-full w-[85%] p-5">
      <TopBar openSidebar={openSidebar} setopenSidebar={setopenSidebar} />
       {children}
      </div>
      <ContentNote  />

    </div>
  )
}

export default Favoritelayout