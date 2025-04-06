import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { MyTestData } from "./utils/utils";
import { UserTestData } from "./utils/utils";
import { useState } from "react";
function Result() {
    const location = useLocation()
    const test_id = location.state.test_id || {}
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authentication);
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [userResponse,setUserResponse] = useState([])
    const [answers,setAnswers] = useState([])
    const [allTest,setAllTest] = useState([])
    // console.log(location);
  
    useEffect(()=>{
        const getQuestion = async()=>{
            try{
                 const data = await  MyTestData.getTestDataByTestID(test_id)
                 const answerData = await UserTestData.getTestDataByTestID(test_id)
                 setUserResponse(JSON.parse(answerData.documents[0].user_answer))
                 setQuestions(JSON.parse(data.documents[0].question))
                 setAnswers(JSON.parse(data.documents[0].real_answer))
                //  console.log(questions,userResponse,answers);
                 
            }catch(error){
                // console.log(error);
            }
        }
        
        getQuestion()
    },[])
    useEffect(()=>{
        if(!user) navigate('/login')
    },[user])
    return ( 
        <div className="result">
            <h1 className="text-3xl font-bold underline text-center">Result</h1>
            <div className="questions"></div>
                {questions.map((question,index)=>{
                    return (
                        <div key={index} className=" bg-amber-100 p-2 m-1">
                            <div className="q"><span className="font-semibold text-yellow-500">Question{index+1}.</span> <span className="text-gray-700">{question.question}</span></div>
                            <div className="ans"><b className="text-green-600">Correct Answer- </b>{answers[index]}</div>
                            <div className="userAns"><b className="text-pink-600">Selected- </b>{userResponse[`ans${index+1}`]}</div>
                            <div className=""><span className="text-amber-700 font-semibold">Explanation-</span><span className=""></span>{question.explanation}</div>

                        </div>
                    )
                })}  
        </div>
     );
}

export default Result;