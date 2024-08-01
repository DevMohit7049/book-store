import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {

  return (

    <>
      <div className='h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
            <h1 className='text-2xl lg:text-5xl font-semibold text-yellow-100 lg:text-left'>Dive Into a Sea of Stories at BookWaves</h1>
            <p className='mt-4 text-zinc-300 '>Welcome to BookWaves –Your Ebook Haven! Explore a diverse collection of ebooks, from fiction to non-fiction.
               Enjoy easy browsing, quick purchases, and instant downloads. Happy reading !</p>

             <div className='mt-8'>
                 <Link to={'/all-books'} className='text-yellow-100 text-xl border border-yellow-100 px-8 py-3 rounded'>Discover Book</Link>
             </div>
        </div>

        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center mt-10'>
            <img src="./hero-3.png" alt="hero-image"/>
        </div>
      </div>
    </>
  )
}

export default Hero