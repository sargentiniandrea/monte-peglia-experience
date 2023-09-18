import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";
import { AuthProvider } from "./authContext";

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
);
