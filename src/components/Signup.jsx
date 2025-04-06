import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { account } from "./utils/utils.js";
import validator from "validator";
// import { ID } from "appwrite";
import { signup } from "../reduxApp/features/authentication.js";
import { useDispatch,useSelector } from "react-redux";
function Signup() {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isAuthenticated,error,status,user} = useSelector(state=>state.authentication)
  // console.log(isAuthenticated,error,status,user);
  
  const handleSignup = async (e) => {
    e.preventDefault();
    const validEmail = validator.isEmail(email);
    const strongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    });
    if (validEmail && strongPassword) {
      try {
        dispatch(signup({email,password,name}))
        // console.log(user);
        navigate('/language')
      } catch (err) {
        // console.log(err);
      }
    } else {
      if (!validEmail) {
        setLoginError(
          "Password should contain atleast 8 characters, 1 lowercase, 1 uppercase and 1 number"
        );
      } else {
        setLoginError("Please enter valid  email and password");
      }
    }
  };
useEffect(()=>{
  if(isAuthenticated){
    navigate('/language')
  }
},[])
  return (
    <div className="main">
      <div className="grid justify-center content-center login h-[calc(100vh-60px)] bg-gray-900">
        <div className=" border pl-10 pr-10 text-center w-sm sm:w-lg md:w-xl rounded-xl bg-purple-900">
          <div className="welcome pt-8 text-white  font-semibold">
            <h2 className="text-xl pb-2 text-center text-white">
              Welcome To QuizAI
            </h2>
            <p className="text-center text-white">Login to explore</p>
          </div>
          <div className="pt-15">
            <input
              className="rounded bg-gray-200 p-3 mb-3 w-full border outline-none"
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setLoginError(null);
              }}
            />
            <input
              className="rounded bg-gray-200 p-3 w-full border outline-none"
              placeholder="email address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError(null);
              }}
            />
            <input
              className="rounded bg-gray-200 p-3 w-full border mt-4 outline-none"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError(null);
              }}
            />
          </div>
          <div className="p-3 text-yellow-200 text-center">{loginError}</div>
          <div className="mt-1 text-center">
            <button
              className=" 
          rounded-md pl-5 
          text-white
          pr-5 pt-3 pb-3 
          bg-purple-500 
          hover:bg-purple-600 
          shadow-xl shadow-purple-950/50 
          inset-shadow-indigo-900 
          ring ring-purple-500"
              onClick={handleSignup}
            >
              Register
            </button>
          </div>
          <div className="mt-4 self-center justify-self-center w-50">
            <div>
              <button className="p-3 text-red-600 bg-white rounded-2xl"> <i className="bi bi-google "></i> Signup With Google</button>
            </div>
          </div>
          <div className="signup pt-3 pb-3 text-center">
            <span className="text-gray-400"> Already have account? </span>
            <button
              className="text-white cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
