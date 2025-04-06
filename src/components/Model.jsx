import { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import JSON5 from 'json5'
import { marked } from "marked";
function Model() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_AI_API_KEY);
  const Prompt = (programming_language,level,number_of_questions)=>{
        const prompt = "Give me "+number_of_questions+" mcq question "+programming_language + " of "+level + " level"
        return prompt
  }
  const model = genAI.getGenerativeModel({
    // model: "gemini-2.0-flash-thinking-exp-01-21",
    // model:"gemini-2.0-flash",
    model:"gemini-1.5-flash",
    systemInstruction:
      "You are an AI who only generates mcq questions with 4 options and"+
      " explains the one correct answers in short.You always response"+
      " only vaild json format strictly as [{'question':string,'option1':string,'option2':string,'option3':string,'option4':string,'answer':number,'explanation':string] I'm going directly parse the response using JSON.parse() so remove ```json ``` from response strictly",
    
      // generationConfig: {
    //   responseMimeType: "application/json",
    //   responseSchema: schema,
    // },
  });
  const generateAnswer = async (prompt) => {
    setIsDisabled(() => true); 
    const result = await model.generateContent(prompt);
    const response = await result.response.candidates[0].content.parts[0].text;
    let cleanResponse = await response.replace(/```(?:json)?|\n*```$/g,"").trim()
    let FinalResponse = JSON5.parse(cleanResponse)
    // console.log(cleanResponse)
    // console.log(JSON.parse(FinalResponse));

    setOutput(FinalResponse);
    setIsDisabled(() => false);
  };
  return (
    <>
      <div className="prompt">
        <div className="output">{output.map((item)=>{
          return (
            <div className="" key={marked(item.question)}>
              <div className="">Question: {marked(item.question.replace(/\n([a-zA-Z]+)\n/g,"```$1\n")+"```")}</div>
              <div className="">A. {marked(item.option1)}</div>
              <div className="">B. {marked(item.option2)}</div>
              <div className="">C. {marked(item.option3)}</div>
              <div className="">D. {marked(item.option4)}</div>
              <div className="">Correct Option:{marked(item.answer)}</div>              
              <div className="">Explanation:{marked(item.explanation)}</div>
              
            </div>
          )
        })}</div>
        <input
          value={input}
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
            generateAnswer(input);
            setInput("");
          }}
        >
          GetAnswer
        </button>
      </div>
    </>
  );
}

export default Model;