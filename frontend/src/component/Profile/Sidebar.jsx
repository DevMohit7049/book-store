import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { authAction } from '../Redux/Store/authReducer';
const Sidebar = ({ UserData }) => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state)=>state.auth.role);

  
  const logout=()=>{
    dispatch(authAction.logout);
    dispatch(authAction.changeRole('user'));
    localStorage.clear('id');
    localStorage.clear('token');
    localStorage.clear('role');
    history('/');
    location.reload()
  }




  return (
    <>
      <div className="bg-zinc-800 p-4 rounded flex items-center justify-between flex-col h-auto lg:h-[100%] md:w-full">
        <div className="flex flex-col items-center ">
          <img src={UserData.avtaar} alt="/" className="h-[10vh]" />
          <p className="mt-3 text-zinc-100 font-semibold">
            {UserData.username}
          </p>
          <p className="mt-3 text-zinc-100 font-semibold">{UserData.email}</p>
          <div className="w-full mt-4 bg-zinc-500 h-[1px] lg:block"></div>
        </div>
        {
          role==='user' && (
          <div className="w-full flex-col items-center justify-between hidden lg:flex md:flex">
          <Link
            to={"/profile"}
            className="w-full text-zinc-100 font-semibold py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>

          <Link
            to={"/profile/OrderHistory"}
            className="w-full text-zinc-100 font-semibold py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>

          <Link
            to={"/profile/setting"}
            className="w-full text-zinc-100 font-semibold py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
          )}

          {
            role==='admin'&&(
              <div className="w-full flex-col items-center justify-between hidden lg:flex md:flex">
              <Link
                to={"/profile"}
                className="w-full text-zinc-100 font-semibold py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
              >
                All Order
              </Link>
    
              <Link
                to={"/profile/add-book"}
                className="w-full text-zinc-100 font-semibold py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
              >
                Add Books
              </Link>
            </div>
            )
          }
        <button
          className="font-semibold bg-zinc-900 rounded 
             w-3/6 lg:w-full mt-4 lg:mt-0 flex items-center justify-center gap-1
          hover:bg-white  transition-all duration-300 py-2 hover:text-black"
          onClick={logout}
        >
          Logout <LuLogOut />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
