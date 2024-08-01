import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

  const [Values,setValuse] = useState({
    username:'',
    email:'',
    password:'',
    address:''
  });

  const navigate = useNavigate();

  const handleChange=(e)=>{
       const {name,value} = e.target;
       setValuse({...Values,[name]:value});
  }


  const handleSubmit= async()=>{
      
      try {
        
         if(Values.username==="" || Values.email==="" || Values.password==="" || Values.address==="")
         {
           alert("All Fields Are Required");
         }
         else{
            const response = await axios.post(`https://book-store-iwgk.onrender.com/user/signup`,Values);
            alert(response.data.message);
            navigate('/login');
         }

      } catch (error) 
      {
         console.log(error);
         alert(error.response.data.message);
      }
  }


  return (
    <>
      <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
          <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
              <h1 className='text-zinc-100 text-xl text-center'>Signup</h1>

              <div className='mt-4'>
                  <div>
                    <label className='text-zinc-400 mb-4'>Username</label>
                    <input 
                    type="text" 
                    name='username'
                    value={Values.username}
                    onChange={handleChange}
                    placeholder='Enter User Name'
                    required
                    className='mt-2 w-full bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                  </div>


                  <div>
                    <label className='text-zinc-400'>Email</label>
                    <input 
                    type="email" 
                    name='email'
                    value={Values.email}
                    onChange={handleChange}
                    required
                    placeholder='Enter Email'
                    className='mt-2 w-full bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                  </div>


                  <div>
                    <label className='text-zinc-400'>Password</label>
                    <input 
                    type="Password" 
                    name='password'
                    value={Values.password}
                    onChange={handleChange}
                    required
                    placeholder='Enter Password'
                    className='mt-2 w-full bg-zinc-900 text-zinc-100 p-2 outline-none'/>
                  </div>
                  
                  <div>
                    <label className='text-zinc-400'>Address</label>
                    <textarea
                    name='address'
                    value={Values.address}
                    onChange={handleChange}
                    required
                    placeholder='Enter Address'
                    className='mt-2 w-full bg-zinc-900 text-zinc-100 p-2 outline-none'>
                  </textarea>
                  </div>

                  <div>
                      <button className='bg-blue-500 px-6 py-2 w-full mt-4 text-white rounded font-semibold'
                      onClick={handleSubmit}>SignUp</button>
                      <p className=' font-semibold text-center mt-4 text-zinc-400'>Or</p>
                  </div>
                   <p className='text-zinc-500 text-center font-semibold mt-4'>Already Have An Account 
                    <Link to={"/login"} className='text-blue-500 underline'> Login</Link>
                   </p>
              </div>
          </div>
      </div>
    </>
  )
}

export default Signup