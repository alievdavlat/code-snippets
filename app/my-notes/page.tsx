"use client"
import ContentNote from '../../components/note/ContentNote'
import Notes from '../../components/note/Notes'
import Tags from '@/components/Tags'
import React from 'react'

const MyNotes = () => {
  


 return (
  <div className='mt-6'>
    
    <div className='flex gap-2'>
    <div className={`w-full`}>
    <Tags/>
    <Notes />
    </div>
    
    <ContentNote  />
    </div>
  </div>
 )
}

export default MyNotes