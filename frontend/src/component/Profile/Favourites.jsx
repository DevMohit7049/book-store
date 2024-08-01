import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCart from '../BookCart/BookCart';
import { HiOutlineEmojiSad } from "react-icons/hi";

const Favourites = () => {
 
  const [FavouriteBook,setFavouritesBook] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
   };

  useEffect(()=>{
   
   const fatchFavouritesBook = async()=>{
       const response = await axios.get(`https://book-store-iwgk.onrender.com/favourits/get-favourites-book`,{headers});
       setFavouritesBook(response.data.data);
    }

    fatchFavouritesBook();

  },[FavouriteBook]);


  return (
  <>
   {
     
      FavouriteBook.length === 0 && (
       <div className='text-2xl text-zinc-500 font-semibold flex items-center justify-center h-full'>
        <HiOutlineEmojiSad  className='text-red-600 mr-2'/>  No Book In Favourites
       </div>
     )}
    <div className='grid grid-cols-4 gap-4'>
      { 
         FavouriteBook && FavouriteBook.map((items,index)=>(
             <div key={index}>
               <BookCart data={items} Favourites={true}/>
             </div>
         ))
      }
      </div>
</>
    )}

export default Favourites