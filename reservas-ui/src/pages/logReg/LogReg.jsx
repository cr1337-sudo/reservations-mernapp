import { useState, useContext } from "react";
import "./logReg.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import {errorNull} from "../../context/authContext/AuthActions"
import { login, register } from "../../context/authContext/apiCalls";

const LogReg = () => {
  const { dispatch, error } = useContext(AuthContext);
  const [loginTarget, setLoginTarget] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({});
  const [loginInfo, setLoginInfo] = useState({});

  //Register
  const handleChangeRegister = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    await register(dispatch, registerInfo)
      };

  //Login
  const handleChangeLogin = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (loginInfo.email && loginInfo.password) {
      await login(dispatch, loginInfo);
    }
  };
  return (
    <div className="c">
      <div
        className={`container ${loginTarget ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#" method="POST" onSubmit={handleSubmitRegister}>
            <h1 className="h1-active">Create Account</h1>
            <div className="social-container">
            {error && <p className="error">{error}</p>}
                         </div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              min="6"
              required
              onChange={handleChangeRegister}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              min="6"
              required
              onChange={handleChangeRegister}
            />
            <input
              type="password"
              placeholder="Password"
              name="password1"
              min="6"
              required
              onChange={handleChangeRegister}
            />
            <input
              type="password"
              placeholder="Password"
              name="password2"
              onChange={handleChangeRegister}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" method="POST" onSubmit={handleSubmitLogin}>
            <h1 className="h1-active">Sign in</h1>
            <div className="social-container">
            {error && <p className="error">{error}</p>}
                         </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              min="6"
              required
              name="email"
              onChange={handleChangeLogin}
            />
            <input
              type="password"
              placeholder="Password"
              min="6"
              required
              name="password"
              onChange={handleChangeLogin}
            />
            <p>Forgot your password?</p>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  setLoginTarget(!loginTarget);
                  dispatch(errorNull())
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  setLoginTarget(!loginTarget);
                  dispatch(errorNull())
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogReg;
