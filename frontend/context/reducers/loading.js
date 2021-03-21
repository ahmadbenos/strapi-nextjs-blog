//loading state reducer, also really simple

const loadingState = (state = true, action) => {
  switch (action.type) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return state;
  }
};

export default loadingState;
