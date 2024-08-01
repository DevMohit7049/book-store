import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [Cart,setCart] = useState();
  const [Total,setTotal] = useState(0);
  const navigate = useNavigate();


  // Headers for API Calling Which have user id and token//
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
   };


   useEffect(()=>{

        const fatchCart = async()=>{
            const response = await axios.get(`http://localhost:3000/cart/get-cart-details`,{headers});
            setCart(response.data.data);

        }
        fatchCart();
   },[Cart])


   useEffect(()=>{

    if(Cart && Cart.length>0){
       let total = 0;
       Cart.map((item)=>{
          total +=item.price;
       });
       setTotal(total);
       total = 0;
    }

   },[Cart]);


   const placeOrder=async()=>{
       try {
          const response = await axios.post(`http://localhost:3000/order/place-order`,{order:Cart},{headers});
          alert(response.data.message);
          navigate('/profile/OrderHistory')
       } catch (error) {
         console.log(error);
       }
   }

   const deleteItem = async(bookid)=>{
     
     const response = await axios.put(`http://localhost:3000/cart/remove-from-cart/${bookid}`,{},{headers});
     alert(response.data.message);
   }

  return (
    <div className='h-[100%]'>
    <div className='bg-zinc-900 px-12 h-screen'>
      {!Cart && 
      <div className='flex items-center w-full h-[100%] justify-center'>
         <Loader/>
      </div>}
      {
        Cart && Cart.length===0 && (
          <div className='h-screen'>
              <div className='h-[100%] flex items-center justify-center flex-col'>
                <h1 className='text-2xl lg:text-6xl font-semibold text-zinc-400'>
                   Empty Cart
                </h1>
                <div className='text-5xl mt-5 text-red-500'>
                  <BsCart4 />
                </div>
              </div>
          </div>
        )}

        {
          Cart&&Cart.length>0&&(
            
            <>
              <h1 className='text-3xl text-center p-4 font-semibold text-zinc-400'>Your Cart</h1>
              {
                Cart.map((item,index)=>(  
                  <div 
                  className='w-full my-2 mx-2 rounded flex flex-col md:flex-row
                  p-3 bg-zinc-800 justify-between items-center'
                  key={index}>

                    <img 
                    src={item.url} alt="/"
                    className=' md:h-[10vh] sm:h-[10vh] object-cover'
                    />
                    
                    <div className='w-full md:w-auto'>
                      <h1 className='text-xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                       {item.title} 
                      </h1>

                      <p className=' text-zinc-300 mt-2 hidden lg:block'>
                        {item.description.slice(0,100)}...
                      </p>

                      <p className=' text-zinc-300 mt-2 hidden md:block lg:hidden'>
                        {item.description.slice(0,65)}...
                      </p>

                      <p className=' text-zinc-300 mt-2 block md:hidden'>
                        {item.description.slice(0,100)}...
                      </p>
                    </div>

                    <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                      <h2 className='text-zinc-100 text-2xl font-semibold flex'>
                      ₹{item.price}
                      </h2>

                      <button
                       onClick={()=>deleteItem(item._id)}
                       className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'>
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                ))
              }
            </>
          )}
          {Cart&&Cart.length >0 && (

               <div className='mt-4 w-full flex items-center justify-end mb-5'>
                  <div className='bg-zinc-800 p-4 rounded'>
                    <h1 className='font-semibold text-xl text-zinc-200'>
                      Total Amount
                    </h1>

                    <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                      <h2>{Cart.length} Books</h2>
                      <h3>₹{Total}</h3>
                    </div>

                    <div className='w-[100%] mt-3'>
                       <button 
                       className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-slate-300'
                       onClick={placeOrder}>
                        Place Your Order
                       </button>
                    </div>

                  </div>
               </div>
             )
          }
    </div>
    </div>
  )
}

export default Cart