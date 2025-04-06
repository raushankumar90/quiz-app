import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import validator from "validator";
import { login,googleLogin} from "../reduxApp/features/authentication.js";
import { useSelector,useDispatch } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass,setShowPass] = useState(false)
  const [loginError,setLoginError] =useState('')
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user,error, status } = useSelector((state) => state.authentication);
  // console.log(isAuthenticated,status,error,user)
  
  const handleLogin = async (e) => {
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
      dispatch(login({email,password}))
    } else {
      if(!validEmail || !strongPassword){
        setLoginError("Password should contain atleast 8 characters, 1 lowercase, 1 uppercase and 1 number");
      }else{
        setLoginError("Please enter valid  email and password");
      }
    }
  };
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/language')
    }
  },[isAuthenticated])
  return (
    <div className="main">
      <div className="grid justify-center content-center login h-[calc(100vh-60px)] bg-gray-900">
        <div className=" border pl-10 pr-10 text-center w-sm sm:w-lg md:w-xl rounded-xl bg-purple-900">
          <div className="welcome pt-8 text-white  font-semibold">
            <h2 className="text-xl pb-2 text-center text-white">Welcome To QuizAI</h2>
            <p className="text-center text-white">Login to explore</p>
          </div>
          <div className="pt-15">
            <input
              className="rounded bg-gray-200 p-3 w-full  outline-none"
              placeholder="email address"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="grid grid-cols-8 bg-white mt-5 rounded-lg">
            <input
              className="rounded-lg bg-gray-200 p-3 w-full  outline-none col-span-7"
              placeholder="password"
              type={`${showPass?'text':'password'}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                }}
              />
              <span
                className="col-span-1 self-center justify-self-center cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                <i
                className={`bi ${
                  showPass ? "bi-eye-slash-fill" : "bi-eye-fill"
                }`}
                ></i>
              </span>
              </div>
              </div>
              <div className="p-3 text-yellow-200 text-center">{loginError}</div>
              <div className="p-3 text-yellow-200 text-center">{error}</div>
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
                onClick={handleLogin}
              >
                LOGIN
              </button>
              </div>
              <div className="mt-4 self-center justify-self-center w-50">
              <div>
                <button onClick={()=>dispatch(googleLogin())} className="p-3 bg-white text-red-600 rounded-2xl"><i className="bi bi-google" style={{color:'red'}} /> Login With Google</button>
              </div>
          </div>
          <div className="signup pt-3 pb-3 text-center">
            <span> new user? </span>
            <button
              className="text-white cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
