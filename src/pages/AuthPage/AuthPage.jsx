import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import { ChartArea } from "chart.js";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [logInState, setLogInState] = useState(-1);
  const [signUpState, setSignUpState] = useState(-1);
  const [guestState, setGuestState] = useState(-1);

    function handleLoginClick() {
        setSignUpState(-1)
        setGuestState(-1)
        setLogInState(-logInState)
    }

    function handleSignUpClick() {
        setGuestState(-1)
        setLogInState(-1)
        setSignUpState(-signUpState)
    }

    function handleGuestClick() {
        setSignUpState(-1)
        setLogInState(-1)
        setGuestState(-guestState)
    }

  return (
    <>
        <NavBar />
        {/* <ChartArea /> */}
        {/* <div className="auth-title">
            <h1>Welcome to Invest-MERN</h1>
            <h2>Earn, Learn, and Invest-MERN</h2>
        </div> */}
        <div className="chart-area">Chart Area</div>
        <div className="auth-buttons">
          <div className="button-bar">
            <div onClick={handleLoginClick}>Log In</div>
            <div onClick={handleSignUpClick}>Sign Up</div>
            <div  onClick={handleGuestClick}>Guest</div>
          </div>
          {logInState < 0? (
              <></>
          )
          : (
          <LoginForm setUser={setUser} /> 
        )}
          {signUpState < 0? (
              <></>
          )
          : (
          <SignUpForm setUser={setUser} /> 
        )}
          {guestState < 0? (
              <></>
          )
          : (
          <LoginForm setUser={setUser} /> 
        )}
          {/* <SignUpForm setUser={setUser} />
        <LoginForm setUser={setUser} /> */}
        </div>
    </>
  );
}
