import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { useState } from "react";
import userImg from "../assets/user.png";
import { signOut } from "../redux/user/userSlice"; // Import the signOut action

export default function Header() {
  const dispatch = useDispatch(); // Define dispatch
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut()); // Dispatch the signOut action
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="focus:outline-none"
              >
                <img
                  src={currentUser.rest.profilePicture || userImg}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 py-1 w-36">
                  <span
                    onClick={handleSignOut}
                    className="block px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                className="text-white mx-3 bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                <Link to="/sign-up">Get started</Link>
              </button>
              <button
                type="button"
                className="text-black mx-3 bg-white hover:bg-Neutral-300 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                <Link to="/sign-in"> Sign In</Link>
              </button>
            </>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to={currentUser ? "/" : "/sign-in"}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent"
                aria-current="page"
              >
                {currentUser ? "Tasks" : "Home"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
