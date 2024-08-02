import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAction } from '../Redux/Store/authReducer';
import {useDispatch} from 'react-redux';

const Login = () => {

  const [Values,setValuse] = useState({username:'',password:''});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange=(e)=>{
       const {name,value} = e.target;
       setValuse({...Values,[name]:value});
  }

  const handleSubmit= async()=>{
      
    try {
      
       if(Values.username==="" || Values.password==="")
       {
         alert("All Fields Are Required");
       }
       else{

          const response = await axios.post(`https://book-store-iwgk.onrender.com/user/login`,Values,{withCredentials:true});
          
          // Calling the action and change the state of redux to login //
              dispatch(authAction.login());
              dispatch(authAction.changeRole(response.data.role));
          // ............................................................//

          localStorage.setItem('id',response.data.id);
          localStorage.setItem('role',response.data.role);
          localStorage.setItem('token',response.data.token);
          navigate('/profile');
       }

    } catch (error) 
    {
       console.log(error);
       alert(error.response.data.message);
    }
}


  return (
    
      <>
         <div className='h-[100vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
          <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
              <h1 className='text-zinc-100 text-xl text-center'>Login</h1>

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
                      <button className='bg-blue-500 px-6 py-2 w-full mt-4 text-white rounded font-semibold'
                      onClick={handleSubmit}>Login</button>
                      <p className='text-white font-semibold text-center mt-4'>Or</p>
                  </div>
                   <p className='text-zinc-500  text-center font-semibold mt-4'>Don't Have An Account
                    <Link to={"/signup"} className='text-blue-500 underline'> Signup</Link>
                   </p>
              </div>
          </div>
      </div>   
      </>
  )
}

export default Login