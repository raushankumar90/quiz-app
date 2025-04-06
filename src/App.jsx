import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Baby from "./components/Signup";
import TestHome from "./components/TestHome";
import TestRunning from "./components/TestPageScreen";
import NewTestSettings from "./components/NewTestSettings";
import { BrowserRouter, Routes, Route } from "react-router";
import TestingPage from "./components/Testing";
import Footer from "./components/Footer";
import { getUser } from "./reduxApp/features/authentication";
import { useDispatch,useSelector } from "react-redux";
import Loading from "./components/smallcomponents/LoadingTcon";
import Result from "./components/Result";
function App() {
  const dispatch  = useDispatch()
  const { isAuthenticated, status } = useSelector(
    (state) => state.authentication
  );
  useEffect(()=>{
    dispatch(getUser())
  },[])
  if(status === "loading")return <Loading></Loading>
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route index element={<TestHome/>}></Route>
          <Route path="/testing" element={<TestingPage/>}></Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Baby/>} />
          <Route path="/" element={<TestHome/>} />
          <Route path="/language" element={<NewTestSettings/>} />
          <Route path="/test/:language/:level/:test_id" element={<TestRunning/>} />
          <Route path="/result/:test_id" element={<Result/>} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
