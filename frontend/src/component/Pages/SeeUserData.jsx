import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({UserDivData,UserDiv,setUserDiv}) => {

  return (
    <>
      <div className={`${UserDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}>{" "}</div>
      <div className={`${UserDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
         <div className='bg-white rounded p-4 w-[80%] md:w-[50%] lg-[40%] text-zinc-900'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold '>User Information</h1>
                <button onClick={()=>setUserDiv("hidden")}>
                   <RxCross1 />
                </button>
            </div>
            <div className="mt-2">
                <label htmlFor="">Username: {""}</label>
                <span className="font-semibold"> {UserDivData.username}</span>
            </div>

            <div className="mt-4">
                <label htmlFor="">Email: {""}</label>
                <span className="font-semibold"> {UserDivData.email}</span>
            </div>

            <div className="mt-4">
                <label htmlFor="">Address: {""}</label>
                <span className="font-semibold"> {UserDivData.address}</span>
            </div>
         </div>
      </div>
    </>
  )
}

export default SeeUserData