const loadingState = (state = true, action) => {
  switch (action.type) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return true;
  }
};

export default loadingState;
