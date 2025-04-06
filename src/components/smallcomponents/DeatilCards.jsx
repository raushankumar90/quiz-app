import { useNavigate } from "react-router";
function DetailCard({ title, description, imagepath }) {
  const navigate= useNavigate()
  const imagepathfile = imagepath;
  return (
    <div className="bg-gray-200 pt-5 sm:pt-0 justify-self-center align-self-center shadow shadow-gray-400 w-full col-span-1 grid">
      <div
        className={`mt-3 sm:mt-0 sm:mb-0 bg-contain s1 w-1/2 
          mx-auto  ring ring-white rounded-full border 
          md:-translate-y-15 w-30 sm:w-40 h-30 sm:h-40`}
          style={{backgroundImage:`url(src/assets/${imagepath})`}}
      ></div>
      <div className=" text-center">
        <p
          className="font-bold mt-10 sm:mt-0"
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
        <p
          className="p-1 sm:p-3 "
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
      <div className=" pb-5 pt-2 flex mx-auto w-1/2 self-end">
        <button
          className="p-3 bg-purple-700 rounded-lg text-white cursor-pointer flex-auto "
          onClick={() => {navigate('/language')}}
        >
          Start Now
        </button>
      </div>
    </div>
  );
}

export default DetailCard;
