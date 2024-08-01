import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MobileNav = () => {

  const role = useSelector((state)=>state.auth.role);

  return (
    <>
     {
      role==='user' && (
        <div className="w-full flex items-center justify-between mt-4 lg:hidden md:hidden">
        <Link
          to={"/profile"}
          className="w-full text-zinc-100 font-semibold  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
  
        <Link
          to={"/profile/OrderHistory"}
          className="w-full text-zinc-100 font-semibold  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>
  
        <Link
          to={"/profile/setting"}
          className="w-full text-zinc-100 font-semibold  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>
      )
     }

     {
      role==='admin' && (
        <div className="w-full flex items-center justify-between mt-4 lg:hidden md:hidden">
        <Link
          to={"/profile"}
          className="w-full text-zinc-100 font-semibold  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          All Order
        </Link>
  
        <Link
          to={"/profile/add-book"}
          className="w-full text-zinc-100 font-semibold  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Add Books
        </Link>
      </div>
      )
     }
    </>
  );
};

export default MobileNav;
