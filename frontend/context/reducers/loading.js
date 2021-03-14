const loadingState = (state = false, action) => {
  switch (action.type) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return false;
  }
};

export default loadingState;
