import React from 'react'
import Hero from '../Home/Hero'
import RecentlyAddedBook from '../Home/RecentlyAddedBook'
import Footer from '../Footer/Footer'
const Home = () => {
  return (
    <>
     <div className='bg-zinc-900 text-white px-10 py-8'>
        <Hero/>
        <RecentlyAddedBook/>
     </div>
    
    </>
  )
}

export default Home