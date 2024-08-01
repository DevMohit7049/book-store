import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrder = () => {
  const [AllOrder, setAllOrder] = useState();
  const [Option,setOption] = useState(-1);
  const [Value,setValue] = useState({status:""});

  const [UserDiv,setUserDiv] = useState("hidden")
  const [UserDivData,setUserDivData] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const FatchAllOrder = async () => {
      const response = await axios.get(
        `https://book-store-iwgk.onrender.com/order/get-all-order`,
        { headers }
      );
      setAllOrder(response.data.data);
    };
    FatchAllOrder();
  }, [AllOrder]);


  const StatusChange=(e)=>{
      const {value} = e.target;
      setValue({status:value});
  }


  const SubmitChange = async (index) => {

    const id = AllOrder[index]._id;
    console.log(id);
    const response = await axios.put(
      `https://book-store-iwgk.onrender.com/order/update-status/${id}`,Value,
      { headers }
    );
    alert(response.data.message);
  };

  // AllOrder&&AllOrder.splice(AllOrder.length-1,1)

  return (
    <>
     
      {!AllOrder && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />{" "}
        </div>
      )}

      {AllOrder && AllOrder.length > 0 && (
      
        <div className="h-[100%] p-0 md:p-4 text-zinc-200">
          <h1 className="text-xl md:text-4xl font-semibold text-zinc-500 mb-4">
            All Orders
          </h1>
 
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>

            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>

            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>

            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>

            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>

            <div className="w-[10%] md:w-[5%]">
              <h1>
               <FaUserLarge />
              </h1>
            </div>
          </div>

           {
            AllOrder && AllOrder.map((item,index)=>(
            
              <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:cursor-pointer 
              hover:bg-zinc-900 transition-all duration-300 ">

                <div className="w-[3%]">
                  <h1 className="text-center">{index+1}</h1>
                </div>

                <div className="w-[40%] md:w-[22%]">
                  <Link to={`/view-book-details/${item.book._id}`}>
                     {item.book.title}
                  </Link>
                </div>

                <div className="w-[40%] md:[45%] hidden md:block">
                  <h1>{item.book.description.slice(0,20)}...</h1>
                </div>

                <div className="w-[10%] md:[9%]">
                  <h1>₹ {item.book.price}</h1>
                </div>

                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button className="hover:scale-105 transition-all duration-300" 
                    onClick={()=>{setOption(index)}}>
                      {
                        item.status === 'Order Placed' ? (
                          <div className="text-yellow-500">{item.status}</div>) : 
                          item.status==="Canceled" ? (<div className="text-red-500">{item.status}</div>): 
                        (<div className="text-green-500">{item.status}</div>)}
                    </button>
                    <div className={`${Option===index ? "block" : "hidden"} flex mt-4`}>
                      <select 
                      name="status" 
                      onChange={StatusChange}
                      value={Value.status}
                      className="bg-gray-800">
                        {
                          [
                            "Order placed",
                             "Out for delivery",
                             "Deliverd",
                             "Canceled"
                          ].map((item,index)=>(
                            <option value={item} key={index}>{item}</option>
                          ))
                          }
                      </select>
                      <button className="mx-2 text-green-500 hover:text-pink-600" 
                      onClick={()=>{SubmitChange(index),setOption(-1)}}>
                        <FaCheck />
                      </button>
                    </div>
                  </h1>
                </div>
                <div className="w-[10%] md:w-[5%]">
                  <button 
                   className="text-xl hover:text-orange-500"
                   onClick={()=>{setUserDiv("fixed")
                    setUserDivData(item.user)
                   }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))
          } 
        </div>
      )}

      {
        UserDivData && (
          <SeeUserData 
          UserDivData={UserDivData}
          UserDiv = {UserDiv}
          setUserDiv = {setUserDiv}
          />
        )
      }

    </>
  );
};

export default AllOrder;
