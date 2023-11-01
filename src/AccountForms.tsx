import { useState } from "react";
import "./css/user.css";
import { useDispatch } from "react-redux";
import loginUser, { signup } from "./fetchUser";
import { AppDispatch } from "./store/types";
import { useNavigate } from "react-router-dom";

function AccountForms() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      await dispatch(
        loginUser({ username: loginUsername, password: loginPassword })
      );
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignupClick = async () => {
    try {
      await dispatch(
        signup({
          username: signupUsername,
          password: signupPassword,
          name: signupName,
        })
      );
      navigate("/home");
    } catch (error) {
      console.error("Signup failed");
    }
  };

  return (
    <section className="account-forms-container">
      <form
        action="#"
        id="login-form"
        className="account-form"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit login");
          handleLoginClick();
        }}
      >
        <h4>Login</h4>
        <div className="login-input">
          <label htmlFor="login-username">username</label>
          <input
            id="login-username"
            autoComplete="current-username"
            onChange={(e) => {
              setLoginUsername(e.target.value);
            }}
          />
        </div>
        <div className="login-input">
          <label htmlFor="login-password">password</label>
          <input
            id="login-password"
            autoComplete="current-password"
            type="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">login</button>
        <hr />
      </form>
      <form
        action="#"
        id="signup-form"
        className="account-form"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignupClick();
        }}
      >
        <h4>Create Account</h4>
        <div className="login-input">
          <label htmlFor="signup-name">name</label>
          <input
            id="signup-name"
            autoCapitalize="words"
            onChange={(e) => {
              setSignupName(e.target.value);
            }}
          />
        </div>
        <div className="login-input">
          <label htmlFor="signup-username">username</label>
          <input
            id="signup-username"
            autoComplete="new-username"
            onChange={(e) => {
              setSignupUsername(e.target.value);
            }}
          />
        </div>
        <div className="login-input">
          <label htmlFor="signup-password">password</label>
          <input
            id="signup-password"
            autoComplete="new-password"
            type="password"
            onChange={(e) => {
              setSignupPassword(e.target.value);
            }}
          />
          <button type="submit">create account</button>
        </div>
      </form>
    </section>
  );
}

export default AccountForms;
