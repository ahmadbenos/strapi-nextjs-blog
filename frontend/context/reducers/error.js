const errorState = (state = "", action) => {
  switch (action.type) {
    case "error":
      return action.payload;
    default:
      return "";
  }
};

export default errorState;
