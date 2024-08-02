import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import BookCart from "../BookCart/BookCart";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const ViewBookDetails = () => {
  const { id } = useParams();
  const [ViewBook, setViewBook] = useState();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fatchBooks = async () => {
      const response = await axios.get(
        `https://book-store-iwgk.onrender.com/book/get-book-details/${id}`
      );
      setViewBook(response.data.data);
    };
    fatchBooks();
  }, []);




  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid:id,
};

  //Add book in favourites //  
  const handleFavourites= async()=>{
     const response = await axios.put(`https://book-store-iwgk.onrender.com/favourits/add-book-to-favourites`,{},{headers})
      alert(response.data.message);
    }


  const handleCart = async()=>{
    const response = await axios.put(`https://book-store-iwgk.onrender.com/cart/add-to-cart`,{},{headers})
    alert(response.data.message);
  }

  const DeleteBook=async()=>{
    const response = await axios.delete(`https://book-store-iwgk.onrender.com/book/delete-book`,{headers});
    alert(response.data.message);
    navigate('/all-books')
    
}


  return (
    <>
      <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
        {ViewBook && (
          <>
            <div className="w-full lg:w-5/6 ">
              <div className="bg-zinc-800 rounded p-12 flex flex-col lg:flex-row justify-around">
                <img
                  src={ViewBook.url}
                  alt="/"
                  className="h-[50vh] lg:h-[70vh]"
                />
                {isLoggedIn === true && userRole === "user" && (
                  <div className="flex items-center justify-between lg:justify-start flex-col md:flex-row lg:flex-col mt-4 lg:mt-8">
                    <button 
                      className="bg-white rounded lg:rounded-full text-2xl p-2 
                          text-red-500 flex items-center justify-center mt-8 md:mt-0" 
                     onClick={handleFavourites}>
                      <FaHeart />{" "}
                      <span className="ms-4 block lg:hidden font-semibold">
                        Favourites
                      </span>
                    </button>

                    <button 
                    className="bg-blue-500 rounded lg:rounded-full text-2xl 
                      p-2 mt-8 md:mt-0 lg:mt-4 text-white flex items-center justify-center"
                      onClick={handleCart}>
                      <FaShoppingCart />{" "}
                      <span className="ms-4 block lg:hidden font-semibold ">
                        Add To Cart
                      </span>
                    </button>
                  </div>
                )}

                {isLoggedIn === true && userRole === "admin" && (
                  <div className="flex items-center justify-between lg:justify-start lg:flex-col mt-4 lg:mt-0  flex-col md:flex-row">
                    <Link to={`/update-book/${id}`} className="bg-white rounded lg:rounded-full text-2xl p-2 mt-8 md:mt-0 flex items-center justify-center">
                    <FaEdit />{" "}
                      <span className="ms-4 block lg:hidden font-semibold">
                        Edit
                      </span>
                    </Link>

                    <button className="bg-white 
                    rounded lg:rounded-full text-2xl p-2 mt-8 md:mt-0 
                    lg:mt-4 text-red-500 flex items-center justify-center" onClick={DeleteBook}>
                    <MdDelete />{" "}
                      <span className="ms-4 block lg:hidden font-semibold ">
                        Delete Book
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 w-full md:w-full sm:w-full">
              <h2 className="mt-4 font-semibold text-zinc-300">
                {ViewBook.title}
              </h2>
              <p className="mt-4 font-semibold text-zinc-400">
                By: {ViewBook.author}
              </p>
              <p className="mt-4 font-semibold text-zinc-500 ">
                {ViewBook.description}
              </p>

              <p className="mt-4 font-semibold text-zinc-400 flex items-center gap-2">
                <GrLanguage /> {ViewBook.language}
              </p>

              <p className="mt-4 font-semibold text-zinc-400">
                Price : ₹ {ViewBook.price}
              </p>
            </div>
          </>
        )}
        {!ViewBook && (
          <>
            <div className="h-screen bg-zinc-900 flex items-center justify-center">
              <Loader />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewBookDetails;
