import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginSignup({ showToast }) {
  const { loginOpen, closeLogin } = useAuth();
  const [tab, setTab] = useState("login");

  function doLogin() {
    closeLogin();
    showToast("Welcome back to Zaplet");
  }

  function doSignup() {
    closeLogin();
    showToast("Account created. Welcome to Zaplet");
  }

  return (
    <div className={"overlay" + (loginOpen ? " show" : "")} id="loginBox">
      <div className="modal">
        <button className="close-x" onClick={closeLogin}>X</button>
        <h2>ZAPLET</h2>
        <p>India's fastest grocery delivery</p>
        <div className="tabs">
          <button id="loginTab" className={tab === "login" ? "tab-on" : ""} onClick={() => setTab("login")}>Login</button>
          <button id="signupTab" className={tab === "signup" ? "tab-on" : ""} onClick={() => setTab("signup")}>Sign Up</button>
        </div>
        <div id="loginForm" className={tab === "login" ? "" : "hidden"}>
          <input type="text" placeholder="Mobile or Email" />
          <input type="password" placeholder="Password" />
          <button className="green-btn" onClick={doLogin}>Login</button>
        </div>
        <div id="signupForm" className={tab === "signup" ? "" : "hidden"}>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Mobile Number" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="green-btn" onClick={doSignup}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
