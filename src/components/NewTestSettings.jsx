import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ID } from "appwrite";
import { Navigate, useNavigate } from "react-router";
import { generateProblems } from "./utils/Gemini/generateProblems";
import { useSelector,useDispatch } from "react-redux";
import Loading from "./smallcomponents/LoadingTcon";
import { MyTestData, MyUserData, UserTestData } from "./utils/utils";
import { setStatus } from "../reduxApp/features/authentication";
function NewTestSettings() {
  const { isAuthenticated, status,user } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch()
  let language = {
    c: "c",
    cplusplus: "cpp",
    csharp: "csharp",
    css3: "css",
    dart: "dart",
    go: "go",
    haskell: "haskell",
    html5: "html",
    java: "java",
    javascript: "javascript",
    kotlin: "kotlin",
    lua: "lua",
    php: "php",
    python: "python",
    r: "R",
    ruby: "ruby",
    swift: "swift",
    typescript: "typescript",
    react: "react",
    django: "django",
    nextjs: "nextjs",
  };
  let levels = ["easy", "medium", "hard", "pro"];
  let navigate = useNavigate();
  const [Lselected, setLSelected] = useState(null);
  const [error, setError] = useState("");
  const [level, setLevel] = useState(null);
  const selectedRef = useRef(null);
  const levelRef = useRef(null);
  useEffect(()=>{
    const exist = async() => {
      // console.log(user.email);
      const result = await MyUserData.checkEmailExists(user.email)
      // console.log("user exist",result);
      
      if(!result){
        MyUserData.createDocument({email:user.email,name:user.name,date_of_signup:new Date()})
      }
    }
    exist()
  },[])
  const handleSelect = (e, key) => {
    if (selectedRef.current) {
      selectedRef.current.style.border = "none";
      selectedRef.current = null;
    }
    selectedRef.current = e.target;
    selectedRef.current.style.border = "3px solid blue";
    setLSelected(key);
    console.log("Clicked");
  };
  const handleLevel = (e, key) => {
    if (levelRef.current) {
      (levelRef.current.style.border = "none"), (levelRef.current = "null");
    }
    levelRef.current = e.target;
    levelRef.current.style.border = "3px solid blue";
    setLevel(key);
    console.log("Clicked");
  };
  const handleTest = async () => {
    if ((Lselected, level)) {
      localStorage.removeItem("userResponse")
      dispatch(setStatus("loading"))
      try {
        const problems = await generateProblems(Lselected, level, 10);
        // console.log(problems);
        let answer = [];
        problems?.map((problem,index)=>{
          answer.push(problem?.answer)
        })
        let test_id = ID.unique()
        const insertOne = await MyTestData.createDocument({
          test_id: test_id,
          question: JSON.stringify(problems),
          test_tech:Lselected,
          test_level:level,
          real_answer:JSON.stringify(answer)
        });

        const insertInUserTest = UserTestData.createDocument({
          email:user.email,
          test_id:test_id,
          test_time:new Date()
        })
        // console.log(insertOne);
        dispatch(setStatus("idle"))
        navigate(`/test/${Lselected}/${level}/${test_id}`, {
          state: {
            language: Lselected,
            level: level,
            test_id:test_id
          },
        });
      } catch (e) {
        // console.log("Error in gemini ai", e);
      }
      
    }
    if (!Lselected) setError("Select A Tech");
    if (!level) setError("Choose A Level");
  };
  useEffect(() => {
    if (Lselected && level) {
      setError("");
    }
  }, [Lselected, level]);

  if (status === "loading") return <Loading></Loading>;
  return isAuthenticated ? (
    <div className="Language">
      <div className="text-center p-5 text-xl font-semibold">
        Select Your Programming Language Or Technology
      </div>
      <div className="selected text-center pt-2 pb-2 text-lg">
        <strong>Your Selected Language : </strong>
        {selectedRef.current ? Lselected.toUpperCase() : "Choose A Tech"}
      </div>
      <div className="grid grid-cols-3 w-full sm:w-3/4 mx-auto h-55 overflow-auto">
        {Object.entries(language).map(([key, value]) => {
          return (
            <div
              className="lang"
              key={key}
              onClick={(e) => {
                handleSelect(e, key);
              }}
            >
              <div className="p-3 bg-gray-200 m-1">
                <i className={`devicon-${key}-plain colored`}></i>
                <span className="ml-2">{value.toUpperCase()}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="level p-3">
        <div className=" text-center mx-auto w-full  sm:w-3/4 md:w-1/2 mb-1">
          <div className="p-3 bg-gray-300 whitespace-nowrap">
            Select Difficulty Level
          </div>
          <div className="">
            <div className="font-semibold">Level Selected:{level}</div>
            <div className="grid md:grid-cols-2 mb-5 gap-2">
              {levels.map((level) => {
                return (
                  <div
                    key={level}
                    className="p-3 bg-orange-500 hover:bg-orange-400 mt-3 text-white text-md"
                    onClick={(e) => handleLevel(e, level)}
                  >
                    {level}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="start">
            <div className="error">{error}</div>
            <button
              onClick={handleTest}
              className="p-3 bg-purple-700 text-white"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default NewTestSettings;