import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import Home from "../component/Pages/Home";
import AllBook from "../component/Pages/AllBook";
import Signup from "../component/Pages/Signup";
import Login from "../component/Pages/Login";
import About from "../component/Pages/About";
import Cart from "../component/Pages/Cart";
import Profile from "../component/Pages/Profile";
import ViewBookDetails from "../component/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../component/Redux/Store/authReducer";
import Favourites from "../component/Profile/Favourites";
import OrderHistory from "../component/Profile/OrderHistory";
import Settings from "../component/Profile/Settings";
import AllOrder from "../component/Pages/AllOrder";
import AddBook from "../component/Pages/AddBook";
import UpdateBook from "../component/Pages/UpdateBook";

const Mapping = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authAction.login());
      dispatch(authAction.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBook />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={<Cart />} />

          {/* Nested Routes for profile page */}
          <Route path="/profile" element={<Profile />}>
            {role === "user" ? (
              <Route index element={<Favourites />} />
            ) : (
              <Route index element={<AllOrder />} />
            )}
            
            {/* If Admin show add book */}
            {
              role==='admin'&& (
              <Route path="/profile/add-book" element={<AddBook/>} />
            )}
            <Route path="/profile/OrderHistory" element={<OrderHistory />} />
            <Route path="/profile/setting" element={<Settings />} />
          </Route>

          <Route path="/about-us" element={<About />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
          <Route path="/update-book/:id" element={<UpdateBook/>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Mapping;
