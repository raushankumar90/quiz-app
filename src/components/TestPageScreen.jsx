import { useNavigate, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import SingleProblem from "./smallcomponents/SingleProblem";
import { useDispatch, useSelector } from "react-redux";
import { MyTestData } from "./utils/utils";
import js from "@eslint/js";
function TestRunning() {
  const { language, level } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [dataObject, setDataObject] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.authentication);
  // console.log(isAuthenticated);
  // console.log(location);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (!location?.state?.language && !location?.state?.level & !location?.state?.test_id) {
      navigate("/language");
    }
  }, [location.state]);


  useEffect(()=>{
    const test_id = location.state?.test_id 
    // console.log(test_id);
    
    async function getTestObject(test_id){
      try{
        setLoading(true)
        const result = await MyTestData.getTestDataByTestID(test_id)
        // console.log(result.documents[0].question);
        
        setDataObject(JSON.parse(result.documents[0]?.question))
      }catch(e){
        // console.log(e);
      }
    }
    getTestObject(test_id)
  },[location.state])
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("isPageRefreshed", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    const isPageRefreshed = sessionStorage.getItem("isPageRefreshed");
    if (isPageRefreshed === "true") {
      // console.log("Page was refreshed");
    }
    sessionStorage.removeItem("isPageRefreshed");
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location, language, level]);

  return (
    <div className="">
      <SingleProblem problems={dataObject} loading={loading} test_id={location.state.test_id}></SingleProblem>
    </div>
  );
}

export default TestRunning;
