const SummaryReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_SERVICES":
      return {
        ...state,
        services: action.payload,
      };
    case "CHANGE_DATE":
      return {
        ...state,
        day: action.payload,
      };
    case "CHANGE_HOUR":
      return {
        ...state,
        hour: action.payload,
      };
    default:
      return { ...state };
  }
};

export default SummaryReducer;
