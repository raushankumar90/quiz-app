import { useEffect, useRef, useState } from "react";
import { MyTestData, UserTestData } from "../utils/utils";
import { useNavigate } from "react-router-dom";
function SingleProblem({ problems,test_id }) {
  const [currentQ, setCurrentQ] = useState(0);
  const navigate = useNavigate()
  const [userResponse,setUserResonse] = useState(()=>{
    if(typeof window !== "undefined"){
      const savedAnswer = localStorage.getItem('userResponse')
      return savedAnswer?JSON.parse(savedAnswer):{}
    }
    return {}
  })
  
  // const ansRef = useRef(null)
  const handlePrev = (e) => {
    setCurrentQ((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = (e) => {
    // console.log(userResponse);
    setCurrentQ((prev) => (prev < problems.length-1 ? prev + 1 : prev));
  };
  const handleAnswer = (e,answer) => {
    // console.log(userResponse);
    setUserResonse((prev)=>({...prev,['ans'+(currentQ+1)]:answer}))
  }
  const submitTest = async() => {
    localStorage.removeItem('userResponse')
    try{
      const saveAnswer = await UserTestData.updateUserAnswer(test_id,JSON.stringify(userResponse))
      // console.log(saveAnswer);
      navigate (`/result/${test_id}`,{state:{test_id:test_id}})
      
    }catch(e){
      // console.log(e);
    }
  }
  useEffect(()=>{  
  localStorage.setItem('userResponse',JSON.stringify(userResponse))
  },[userResponse])
  if(problems?.length>0) return (
    <div className="">
      <div className="problem sm:w-3/4 mx-auto grid gap-3 mt-2">
        <div className="Q p-3 bg-purple-600 ml-1 mr-1 sm:ml-0 sm:mr-0">
          <span className="text-white font-semibold">Question{currentQ+1}.</span>{" "}
          <span className="text-gray-100">{problems[currentQ]?.question}</span>
        </div>
        <div className="optons  grid gap-3 mt-2 mr-1 ml-1 sm:ml-0 sm:mr-0">
          <div style={{backgroundColor:userResponse['ans'+(currentQ+1)]=='1'?'green':''}} className="op1 p-3 border hover:bg-gray-300" onClick={(e)=>{handleAnswer(e,1)}}><span>1. {problems[currentQ]?.option1}</span></div>
          <div style={{backgroundColor:userResponse['ans'+(currentQ+1)]=='2'?'green':''}} className="op2  p-3 border hover:bg-gray-300" onClick={(e)=>{handleAnswer(e,2)}}>2. {problems[currentQ]?.option2}</div>
          <div style={{backgroundColor:userResponse['ans'+(currentQ+1)]=='3'?'green':''}} className="op3 p-3  border hover:bg-gray-300" onClick={(e)=>{handleAnswer(e,3)}}>3. {problems[currentQ]?.option3}</div>
          <div style={{backgroundColor:userResponse['ans'+(currentQ+1)]=='4'?'green':''}} className="op4  p-3 border hover:bg-gray-300" onClick={(e)=>{handleAnswer(e,4)}}>4. {problems[currentQ]?.option4}</div>
        </div>
      </div>
      <div className="btn grid grid-cols-3 gap-2 m-3 ">
        <div className="w-full col-span-1 grid justify-end">
          <button className="p-4 bg-purple-400 hover:bg-purple-300" onClick={handlePrev}>Prev</button>
        </div>
        <div className="w-full col-span-1 grid justify-center">
          <button className="p-4 bg-purple-400 hover:bg-purple-300" onClick={handleNext}>Next</button>
        </div>
        <div className="w-full col-span-1">
          <button onClick={submitTest} className="p-4 bg-purple-400 hover:bg-purple-300" >Submit</button>
        </div>
      </div>
    </div>
  );
}

export default SingleProblem;