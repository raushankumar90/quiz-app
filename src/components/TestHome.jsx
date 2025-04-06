import "../App.css";
import DetailCard from "./smallcomponents/DeatilCards";
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
          imagepath={"pexels-leeloothefirst-5428833.jpg"}
        ></DetailCard>
        <DetailCard
          title={"Instant Feedback and Explanation"}
          description={
            " Get <strong>real-time feedback</strong> after each question! Our AI provide correct answer and detailed explanation to help you understand the concept better"
          }
          imagepath={"pexels-mikhail-nilov-7988086.jpg"}
        ></DetailCard>
        <DetailCard
          title={"Languages and Modes"}
          description={
            " Practice with any programming language in different difficulty modes <strong>easy</strong> , <strong>medium</strong> and <strong>hard</strong>"
          }
          imagepath={"pexels-mikhail-nilov-7988086.jpg"}
        ></DetailCard>
      </div>
    </div>
  );
}

export default TestHome;
