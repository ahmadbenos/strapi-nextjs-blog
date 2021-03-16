const initialState = {
  islogged: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        user: action.payload,
        islogged: true,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        islogged: false,
      };
    default:
      return state;
  }
};

export default authReducer;
