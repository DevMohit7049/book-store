import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const BookCart = ({ data,Favourites }) => {

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid:data._id
   };


  const handleRemoveFavourites = async()=>{
         const response = await axios.put(`http://localhost:3000/favourits/delete-book-from-favourites`,{},{headers});
        alert(response.data.message);
        
  }
  

  return (
    <>
     <div className="bg-zinc-800 rounded p-4 flex flex-col">
     <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-900 flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]"/>
          </div>
          <h2 className="mt-4 font-semibold text-zinc-200">{data.title}</h2>
          <p className="mt-4 font-semibold text-zinc-200">By: {data.author}</p>
          <p className="mt-4 font-semibold text-zinc-200">₹ {data.price}</p>
        </div>
      </Link>
      {
        Favourites&& (
          <button className="bg-zinc-700 px-2 py-2 rounded mt-2" onClick={handleRemoveFavourites}>
            Romove From Favourites
          </button>
   
        )}
      </div>
    </>
  );
};

export default BookCart;
