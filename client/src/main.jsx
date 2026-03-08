import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard.jsx";
import AIProductGenerator from "./pages/AIProductGenerator.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/AuthLanding/Login.jsx"; 
import Signup from "./pages/AuthLanding/Signup.jsx";
import ForgetPassword from "./pages/AuthLanding/ForgetPassword.jsx";
import Orders from "./pages/Orders.jsx";
import AISupportBot from "./pages/AISupportBot.jsx";
import AILogs from "./pages/AILog.jsx";

const GoogleAuthWrapper=({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<GoogleAuthWrapper>
        <Login />
      </GoogleAuthWrapper>} />
      <Route path="/signup" element={<GoogleAuthWrapper>
        <Signup />
      </GoogleAuthWrapper>} />
      <Route path="/auth/forgetPassword" element={<ForgetPassword/>}/>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/app" element={<App />}>
          <Route index element={<Dashboard/>} /> 
          <Route path="ai-product-generator" element={<AIProductGenerator />} />
          <Route path="products" element={<Products/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="ai-support-bot" element={<AISupportBot/>} />
          <Route path="ai-logs" element={<AILogs/>} />
        </Route>    
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} theme="dark"/>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
