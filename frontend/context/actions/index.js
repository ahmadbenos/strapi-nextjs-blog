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
