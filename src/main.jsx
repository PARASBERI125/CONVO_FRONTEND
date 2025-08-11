import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./store/AuthStore.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
    </AuthProvider>
  </BrowserRouter>
);
