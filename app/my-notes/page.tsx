"use client"
import Notes from '@/components/Notes'
import Tags from '@/components/Tags'
import React from 'react'

const MyNotes = () => {

 return (
  <div className='mt-6'>
    <Tags/>
    <Notes/>
  </div>
 )
}

export default MyNotes