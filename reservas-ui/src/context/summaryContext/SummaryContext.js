import { useReducer, createContext } from "react";
import SummaryReducer from "./SummaryReducer";

const INITIAL_STATE = {
  services: [],
  day:{},
  hour: null,
};

export const SummaryContext = createContext(INITIAL_STATE);

export const SummaryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SummaryReducer, INITIAL_STATE);

  return (
    <SummaryContext.Provider
      value={{
        services: state.services,
        day: state,
        hour: state.hour,
        dispatch,
      }}
    >
    {children}
    </SummaryContext.Provider>
  );
};
