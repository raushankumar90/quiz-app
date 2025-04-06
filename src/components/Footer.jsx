import { useState,useEffect } from "react";
function Footer() {
    const [isTallWindow, setIsTallWindow] = useState(false);

    useEffect(() => {
        if (window.innerHeight > 100) {
            setIsTallWindow(true);
        }
    }, []);
    return ( 
        <div className={`${isTallWindow?'':'sticky bottom-0'} footer grid grid-cols-2 bg-gray-900 text-white p-5   shadow-xl shadow-purple-500/50 inset-shadow-indigo-900 ring ring-purple-500`}>
            <div className="text-center">
                <h1>QuizAI</h1>
                <p>© 2021 QuizAI, Inc.</p>
            </div>
            <div className="text-center">
                <h1>Follow Us</h1>
                <div className="social flex justify-center">
                    <i className="bi bi-facebook p-2"></i>
                    <i className="bi bi-twitter p-2"></i>
                    <i className="bi bi-instagram p-2"></i>
                    <i className="bi bi-linkedin p-2"></i>
                </div>
            </div>
        </div>
     );
}

export default Footer;