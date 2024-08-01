import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Sidebar from '../Profile/Sidebar'
import MobileNav from '../Profile/MobileNav'

const Profile = () => {

  const [UserData,setUserData] = useState();


  const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(()=>{

        const fatchUserInfo = async ()=>{
             const response = await axios.get(`http://localhost:3000/user/get-userInfo`,{headers});
             setUserData(response.data);
        }
        fatchUserInfo();
  },[])

  return (
    <>
       <div className='bg-zinc-900 text-white px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4'>
        {!UserData && <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div> }
        {UserData && (
        <>
          <div className='w-full md:w-1/6 h-auto lg:h-screen'>
             <Sidebar UserData={UserData}/>
             <MobileNav/>
          </div>

          <div className='w-full md:w-5/6'>
           <Outlet/>
          </div>
        </>
        )}
         
       </div>
    </>
  )
}

export default Profile