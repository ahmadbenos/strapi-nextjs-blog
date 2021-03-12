export default {
  setUser: (payload, changeType) => {
    return {
      type: changeType == "login" ? "USER_LOGIN" : "USER_LOGOUT",
      payload,
    };
  },
};
