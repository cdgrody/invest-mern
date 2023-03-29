import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import NavBar from "../../components/NavBar/NavBar";
import { signUp } from '../../utilities/users-service'
import { useState } from "react";
import { ChartArea } from "chart.js";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [logInState, setLogInState] = useState(-1);
  const [signUpState, setSignUpState] = useState(-1);
  const [guestState, setGuestState] = useState(-1);
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//     error: ""
//   });

  async function handleSubmit(evt) {
    evt.preventDefault();
    let currentDate = new Date();
    const formData = {
        name: "Guest",
        email: `${currentDate.toLocaleDateString()}-${currentDate.toLocaleTimeString()}@guest.com`,
        password: `${currentDate.toLocaleDateString()}-${currentDate.toLocaleTimeString()}`,
        confirm: `${currentDate.toLocaleDateString()}-${currentDate.toLocaleTimeString()}`,
    }
    const user = await signUp(formData)
    setUser(user);
  }

  function handleLoginClick() {
    setSignUpState(-1);
    setGuestState(-1);
    setLogInState(-logInState);
  }

  function handleSignUpClick() {
    setGuestState(-1);
    setLogInState(-1);
    setSignUpState(-signUpState);
  }

  function handleGuestClick() {
    setSignUpState(-1);
    setLogInState(-1);
    setGuestState(-guestState);
  }

  return (
    <main className="auth-main">
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
          <div onClick={handleGuestClick}>Guest</div>
        </div>
        <div className="authpage-forms">
          {logInState < 0 ? <></> : <LoginForm setUser={setUser} />}
          {signUpState < 0 ? <></> : <SignUpForm setUser={setUser} />}
          {guestState < 0 ? (
            <></>
          ) : (
            <div className="guest-action">
              <div className="guest-message">
                Continuing as a guest will mean your data will not be saved upon
                exit.
              </div>
              <button onClick={handleSubmit}>Sign In as Guest</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
