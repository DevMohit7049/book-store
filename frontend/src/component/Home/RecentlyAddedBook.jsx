import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCart from '../BookCart/BookCart';
import Loader from '../Loader/Loader';

const RecentlyAddedBook = () => {

  const [Data,setData] = useState();
  useEffect(()=>{
 
        const fatchBooks = async ()=>{
          const response = await axios.get('http://localhost:3000/book/get-recent-book');
          setData(response.data.data)
        }
      fatchBooks();
  },[])

  return (

     < >
       <div className='mt-8 px-4'>
           <div className='text-3xl text-yellow-100'>Recently Added Books</div>
           {!Data && (
              <div className='flex items-center justify-center'>
                <Loader/>{" "}
              </div>
           )}
           <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
            {
              Data && Data.map((item,index)=>(
                <div key={index}>

                  <BookCart data={item}/>{" "}
                </div>
              ))
            }
           </div>
       </div>
     </>
  )
}

export default RecentlyAddedBook