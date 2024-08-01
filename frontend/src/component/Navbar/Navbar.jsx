import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },

    {
      title: "All Books",
      link: "/all-books",
    },

    {
      title: "Cart",
      link: "/cart",
    },


    {
      title: "About Us",
      link: "/about-us",
    },


    
    {
      title: "Profile",
      link: "/profile",
    },

    {
      title: "Admin Profile",
      link: "/profile",
    },
    

  ];

  const [MobileView, setMobileView] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);

  if (isLoggedIn === false) {
    links.splice(3, 3);
  }

  if (isLoggedIn === true && role === 'user') {
    links.splice(5,1)
  }


  if (isLoggedIn === true && role === 'admin') {
    links.splice(3,2)
  }

  


  return (
    <>
      <nav className="z-50  bg-zinc-800 text-white px-8 py-4 flex items-center justify-between relative">
        <div className="flex items-center">
          <img
            className="h-10 me-3"
            src="https://cdn-icons-png.flaticon.com/128/5516/5516842.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookWaves</h1>
        </div>

        <div className="nav-links-waves block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, index) => (
              <div className="flex items-center" key={index}>
                {item.title === "Profile" ? (
                  <Link
                    key={index}
                    to={item.link}
                    className="border
                     border-blue-400 px-4 py-1 rounded
                     hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    key={index}
                    to={item.link}
                    className="hover:text-blue-400 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )
                }
              </div>
            ))}
          </div>
          <div className="hidden md:flex gap-4">
            {isLoggedIn === false && (
              <>
                <Link
                  to={"/login"}
                  className="border
                     border-blue-400 px-2 py-1 rounded
                     hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  Login
                </Link>

                <Link
                  to={"/signup"}
                  className="px-2 py-1
                     bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>

          <button
            className="block md:hidden text-white text-2xl
                 hover:text-zinc-400"
            onClick={() =>
              MobileView === "hidden"
                ? setMobileView("block")
                : setMobileView("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={`${MobileView}  bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            onClick={() =>
              MobileView === "hidden"
                ? setMobileView("block")
                : setMobileView("hidden")
            }
            className={`${MobileView} text-white text-2xl mb-4 hover:text-blue-400 transition-all duration-300`}
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to={"/login"}
              className={`border ${MobileView}
                     border-blue-400 px-4 py-2 rounded text-2xl mb-4 text-white
                     hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              Login
            </Link>

            <Link
              to={"/signup"}
              className={`${MobileView} px-4 py-2 text-2xl mb-4 text-white
                     bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
