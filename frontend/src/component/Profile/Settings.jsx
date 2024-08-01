import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';

const Settings = () => {

  const [ProfileData,setProfileData]=useState();
  const [Value,setValue] = useState({address:""});



  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
   };

   useEffect(()=>{

    const fatchUserData= async()=>{
       const response = await axios.get(`http://localhost:3000/user/get-userInfo`,{headers});
       setProfileData(response.data);
       setValue({address:response.data.address});
    }

    fatchUserData();
  },[])

  // update state for changing the value of username,email and address//
  const handleUpdate=(e)=>{
      const {name,value} = e.target;
      setValue({...Value,[name]:value});
  }

  
  // handle submit for submiting the address //
  const handleSubmit=async()=>{
    const response = await axios.put(`http://localhost:3000/user/update-address`,Value,{headers});
    alert(response.data.message);
  }
  return (
    <>
    {
      !ProfileData && <div className='flex items-center justify-center h-[100%]'>
        <Loader/>
      </div>
    }
    {
      ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-2xl md:text-3xl font-semibold text-zinc-500 mb-8'>Setting</h1>

          <div className='flex gap-12'>
            <div>
              <label htmlFor="" className='font-semibold'>Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              onChange={handleUpdate}>{ProfileData.username}</p>
            </div>


            <div>
              <label htmlFor="" className='font-semibold'>Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              onChange={handleUpdate}>{ProfileData.email}</p>
            </div>
          </div>

          <div className='mt-4 flex flex-col'>
            <label htmlFor="" className='font-semibold'>Address</label>
            <textarea name="address" 
            className='p-2 rounded bg-zinc-800 font-semibold'
            placeholder='Address'
            rows={5}
            value={Value.address}
            onChange={handleUpdate}/>
          </div>

          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 px-4 py-2 rounded text-zinc-900 font-semibold hover:bg-yellow-400
            transition-all duration-300' onClick={handleSubmit}>Update</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings