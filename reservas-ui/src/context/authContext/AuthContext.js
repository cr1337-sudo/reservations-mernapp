import { createContext, useEffect, useReducer } from "react";
import { encryptData, decryptData } from "./utils";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: localStorage.getItem("user") ? decryptData(localStorage.getItem("user"), process.env.REACT_APP_SECRET_WORD) : null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const check = ()=>{
      if(state.user && !state.user.error){
       localStorage.setItem("user",  encryptData(state?.user, process.env.REACT_APP_SECRET_WORD))
        
    }
    }
    check()
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
