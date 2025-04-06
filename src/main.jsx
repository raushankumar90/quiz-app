import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { store } from "./reduxApp/store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Provider store={store}>
    <App />
    </Provider>
  </GoogleOAuthProvider>
);
