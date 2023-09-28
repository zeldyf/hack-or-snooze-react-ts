import { useState } from "react";
import { useUser } from "./UserContext";
import "./css/user.css";

function AccountForms() {
  const { login, signup } = useUser();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

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
          login(loginUsername, loginPassword);
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
          console.log("submit login");
          signup(signupUsername, signupPassword, signupName);
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
