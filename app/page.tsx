import React from 'react'
import Navbar from '@/components/Navbar'
import CtaSection from '@/components/CtaSection'
import Image from 'next/image'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <CtaSection/>

      <div className='p-10 mt-10 flex items-center justify-center'>
        <Image
        src={'/app.webp'}
        width={1000}
        height={500}
        alt='home'
        className='object-cover'
        />
      </div>
    </div>
  )
}

export default Home