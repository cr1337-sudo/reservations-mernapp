const SessionReducer = (state, action) => {
  switch (action.type) {
    case "DATE_CHANGE":
      return {
        hours: [],
        isFetching: true,
        error: false,
      };
    case "SESSION_OK":
      return {
        hours: action.payload,
        isFetching: false,
        error: false,
      };
    case "SESSION_ERROR":
      return {
        hours: [],
        isFetching: false,
        error: true,
      };
    default:
      return [...state];
  }
};

export default SessionReducer;
