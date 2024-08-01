import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import BookCart from "../BookCart/BookCart";

const AllBook = () => {
  
  const [BookData,setBookData] = useState();
  useEffect(()=>{
 
        const fatchBooks = async ()=>{
          const response = await axios.get('https://book-store-iwgk.onrender.com/book/get-all-books');
          setBookData(response.data.data);
        }
   
      fatchBooks();
  },[])


  return (
    <>
      <div className="bg-zinc-900 h-auto px-12 py-8">
        <div className="text-3xl text-yellow-100">All Books</div>
        {!BookData && (
          <div className="flex items-center justify-center">
            <Loader />{" "}
          </div>
        )}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {BookData &&
            BookData.map((item, index) => (
              <div key={index}>
                <BookCart data={item} />{" "}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllBook;
