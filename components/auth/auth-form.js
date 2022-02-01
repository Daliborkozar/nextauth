import { useState } from "react";
import classes from "./auth-form.module.css";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (email, password) => {
    await axios.post("/api/auth/singup", {
      email: email,
      password: password,
    });
  };

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mail = email;
    const pass = password;

    // redirect can be configured, redirected
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: mail,
        password: pass,
      });
      console.log(result)
    } else {
      await createUser(mail, pass);
    }
  };


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
