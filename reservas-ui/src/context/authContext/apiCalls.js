import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerFailure,
} from "./AuthActions";
import axios from "axios";

export const login = async (dispatch, data) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", data);
    if (res.status === 200) {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(loginFailure("Login credentials don't match"));
    }
  } catch {
    dispatch(loginFailure("Something went wrong, try again later"));
  }
};

export const register = async (dispatch, data) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("auth/register", data);
    console.log(res)
    if (res.status === 200) {
      login(dispatch, { email: data.email, password: data.password1 });
    }else{
      dispatch(registerFailure(res.data.error))
    }
  } catch {
    dispatch(registerFailure("Error during register"));
  }
};
