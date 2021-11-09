const ThemeReducer = (state,action) => {
  // console.log(state);
  console.log(state)
  switch (action.type) {
    case "SET_THEME_LIGHT":
      return {
        theme: action.payload,
      };
    case "SET_THEME_DARK":
      return {
        theme: action.payload,
      };
    default:
      return { ...state };
  }
};

export default ThemeReducer;
