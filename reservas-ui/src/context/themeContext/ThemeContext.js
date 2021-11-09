import { createContext, useEffect, useReducer } from "react";
import ThemeReducer from "./ThemeReducer";

const INITIAL_STATE = {
  theme: localStorage.getItem("theme") || "dark",
};

export const ThemeContext = createContext(INITIAL_STATE);

export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, INITIAL_STATE);

  useEffect(() => {
    const setTheme = ()=>{
      if(state.theme) return localStorage.setItem("theme", state.theme)
    }
    setTheme()
  }, [state])

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        dispatch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
