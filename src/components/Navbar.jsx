import { NavLink ,useNavigate} from "react-router-dom";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction , login as Login} from "../reduxApp/features/authentication";
import { account } from "./utils/utils";
function Navbar() {
  let navigate = useNavigate()
  const menuSettingsRef = useRef(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const {isAuthenticated,user,status,error,loginMethod} = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  // console.log(isAuthenticated,status,error,user,loginMethod);
  
  const logout = async (e) => {
    const result =  dispatch(logoutAction());
    navigate( "/login");
  };
   
  const handleShowMenu = () => {
    if (!isOpenMenu && menuSettingsRef?.current) {
      menuSettingsRef.current.style.width = "100vw";
      menuSettingsRef.current.classList.add("visible");
      menuSettingsRef.current.classList.remove("invisible");
      setIsOpenMenu(true);
    }
  };
  const handleHideMenu = () => {
    if (isOpenMenu) {
      menuSettingsRef.current.classList.add("invisible");
      menuSettingsRef.current.classList.remove("visible");
      setIsOpenMenu(false);
    }
  };
 
  return (
    <div className="sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-800">
          QuizApp
        </NavLink>
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                <i className="bi bi-box-arrow-in-right"></i> Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                <i className="bi bi-person-plus"></i> Signup
              </NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-gray-700 hover:text-gray-900 transition"
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          )}
        </div>
        <button
          className="md:hidden text-gray-700 hover:text-gray-900 transition z-50"
          onClick={isOpenMenu ? handleHideMenu : handleShowMenu}
        >
          {isOpenMenu ? (
            <i className="bi bi-x-lg"></i> // Cross icon for closing
          ) : (
            <i className="bi bi-list"></i> // Burger menu icon
          )}
        </button>
      </div>
      <div
        ref={menuSettingsRef}
        className={`absolute top-0 left-0 w-full h-screen bg-white bg-opacity-70 backdrop-blur-md transition-all duration-300 ${
          isOpenMenu ? "visible opacity-100" : "invisible opacity-0"
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-gray-900 text-lg transition"
                onClick={handleHideMenu}
              >
                <i className="bi bi-box-arrow-in-right"></i> Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-gray-700 hover:text-gray-900 text-lg transition"
                onClick={handleHideMenu}
              >
                <i className="bi bi-person-plus"></i> Signup
              </NavLink>
            </>
          ) : (
            <button
              onClick={(e) => {
                logout(e);
                handleHideMenu();
              }}
              className="text-gray-700 hover:text-gray-900 text-lg transition"
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
