import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import ModalSignProvider from "./context/ModalSignProvider.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalSignProvider>
          <App />
        </ModalSignProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
