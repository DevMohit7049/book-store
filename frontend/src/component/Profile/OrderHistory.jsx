import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import {Link} from 'react-router-dom';

const OrderHistory = () => {

  const [OrderHistory,setorderHistory] = useState();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
   };

   useEffect(()=>{

     const fatchOrder= async()=>{
        const response = await axios.get(`https://book-store-iwgk.onrender.com/order/order-history`,{headers});
        setorderHistory(response.data.data);
     }

     fatchOrder();
       
   },[])

  return (
 <>
  {!OrderHistory&&(
    <div className='flex flex-item justify-center h-[100%]'>
      <Loader/>
    </div>
  )}

  {
    OrderHistory && OrderHistory.length > 0 && (
       <div className='h-[100%] p-0 md:p-4 text-zinc-200'>
        <h1 className='text-xl md:text-4xl font-semibold text-zinc-500 mb-4'>
          Your Order History
        </h1>
            <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>

               <div className='w-[3%]'>
                <h1 className='text-center'>Sr.</h1>
               </div>


               <div className='w-[22%]'>
                   <h1 >Books</h1>
               </div>


               <div className='w-[45%]'>
                <h1>Description</h1>
               </div>

               <div className='w-[9%]'>
                <h1>Price</h1>
               </div>

               <div className='w-[16%]'>
                <h1>Status</h1>
               </div>

               <div className='w-none md:w-[5%] hidden md:block'>
                <h1>mode</h1>
               </div>
            </div>
            {OrderHistory.map((item,index)=>(
               <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
                 <div className='w-[3%]'>
                    <h1 className='text-center'>{index+1}</h1>
                 </div>

                 <div className='w-[22%]'>
                   <Link to={`/view-book-details/${item.book._id}`}
                    className='hover:text-blue-300'>
                      {item.book.title}
                   </Link>
                 </div>

                 <div className='w-[45%]'>
                   <h3>{item.book.description.slice(0,50)}...</h3>
                 </div>

                 
                 <div className='w-[9%]'>
                   <h1>₹{item.book.price}</h1>
                 </div>

                 <div className='w-[16%]'>
                   <h1 className='font-semibold text-green-500'>
                    {item.status==='Order Placed' ? (<div>{item.status}</div>)
                    : item.status==='Calceled' ? (<div className='text-red-500'>{item.status}</div>)
                    :(item.status)
                    }
                   </h1>
                 </div>
                 <div className='w-none md:w-[5%] hidden md:block'>
                   <h1 className='text-sm text-zinc-100'>COD</h1>
                 </div>
               </div>
            ))}
       </div>
      )}
 </>
  )
}

export default OrderHistory