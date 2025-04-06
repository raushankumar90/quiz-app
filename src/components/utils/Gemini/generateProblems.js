import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_AI_API_KEY);
import JSON5 from "json5";

export const generateProblems = async (
  programming_language,
  level,
  question_count
) => {
  const prompt =
    "Give me " +
    question_count +
    " mcq question of" +
    programming_language +
    "progarmming language or technology of " +
    level +
    " level";

  const model = genAI.getGenerativeModel({
    // model: "gemini-2.0-flash-thinking-exp-01-21",
    // model:"gemini-2.0-flash",
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are an AI who only generates mcq questions with 4 options and" +
      " explains the one correct answers in short.You always response" +
      " only vaild json format strictly as [{'question':string,'option1':string,'option2':string,'option3':string,'option4':string,'answer':number,'explanation':string},] I'm going directly parse the response using JSON.parse() so remove ```json ``` from response strictly",
  });

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request time out")), 30000);
  });
  const result = await Promise.race([
    model.generateContent(prompt),
    timeoutPromise,
  ]);
  const response = result.response.candidates[0].content.parts[0].text;
  let cleanResponse = response.replace(/```(?:json)?|\n*```$/g, "").trim();
  // console.log(cleanResponse);
  let FinalResponse = JSON5.parse(cleanResponse);
  // console.log(FinalResponse);
  return FinalResponse;
};
