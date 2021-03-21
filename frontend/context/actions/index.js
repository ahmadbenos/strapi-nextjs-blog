//this is all the actions to dispatch in several pages

export const setUser = (payload, changeType) => {
  return {
    type: changeType == "login" ? "USER_LOGIN" : "USER_LOGOUT",
    payload,
  };
};

export const setLoading = (state) => {
  return {
    type: state.toString(),
  };
};

export const setError = (error) => {
  return {
    type: "error",
    payload: error,
  };
};

// export const setUserAuth = (data) => {
//   return {
//     type: "USER_LOGIN",
//     payload: data,
//   };
// };
