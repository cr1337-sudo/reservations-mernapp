import { createContext, useReducer } from "react";
import SessionReducer from "./SessionReducer"

const INITIAL_STATE = {
  hours: [],
  isFetching: false,
  error: false,
};

export const SessionContext = createContext(INITIAL_STATE);

export const SessionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SessionReducer, INITIAL_STATE);

  return (
    <SessionContext.Provider
      value={{
        hours: state.hours,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
