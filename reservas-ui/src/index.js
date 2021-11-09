import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SessionContextProvider } from "./context/sessionContext/SessionContext";
import { SummaryContextProvider } from "./context/summaryContext/SummaryContext";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import {ThemeContextProvider} from "./context/themeContext/ThemeContext"

ReactDOM.render(
  <React.StrictMode>
  <ThemeContextProvider>
    <AuthContextProvider>
      <SessionContextProvider>
        <SummaryContextProvider>
          <App />
        </SummaryContextProvider>
      </SessionContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
