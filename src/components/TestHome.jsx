import "../App.css";
import DetailCard from "./smallcomponents/DeatilCards";
import img1 from "../assets/pexels-leeloothefirst-5428833.jpg";
import img2 from "../assets/pexels-mikhail-nilov-7988086.jpg";
import img3 from "../assets/pexels-jorge-jesus-137537-614117.jpg"
function TestHome() {
  return (
    <div className="tsethome pb-10 bg-gray-900">
      <div className="w-full h-[20vh] sm:h-[45vh] bg-gray-900">
        <h1 className="text-yellow-500 text-2xl font-semibold p-5 sm:p-10 text-center">
          Welcome to AI-Powered MCQ Practice!{" "}
        </h1>
      </div>
      <div className="Specification grid md:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 p-2">
        <DetailCard
          title={"AI-Generated Questions"}
          description={
            "Our <strong>AI-Powered</strong> mcq plateform generates dynamic,high-quality mcq tailored to your needs"
          }
          imagepath={img1}
        ></DetailCard>
        <DetailCard
          title={"Instant Feedback and Explanation"}
          description={
            " Get <strong>real-time feedback</strong> after each question! Our AI provide correct answer and detailed explanation to help you understand the concept better"
          }
          imagepath={img2}
        ></DetailCard>
        <DetailCard
          title={"Languages and Modes"}
          description={
            " Practice with any programming language in different difficulty modes <strong>easy</strong> , <strong>medium</strong> and <strong>hard</strong>"
          }
          imagepath={img3}
        ></DetailCard>
      </div>
    </div>
  );
}

export default TestHome;
