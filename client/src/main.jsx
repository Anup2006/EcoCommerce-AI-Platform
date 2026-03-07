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
import Dashboard from "./pages/Dashboard.jsx";
import AIProductGenerator from "./pages/AIProductGenerator.jsx";
import Products from "./pages/Products.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="/app" element={<App />}>
        <Route index element={<Dashboard/>} /> 
        <Route path="ai-product-generator" element={<AIProductGenerator />} />
        <Route path="products" element={<Products/>} />
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
