const initialState = {
  islogged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        islogged: true,
      };
    case "USER_LOGOUT":
      return {
        islogged: false,
      };
    default:
      return state;
  }
};

export default authReducer;
