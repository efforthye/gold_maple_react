const TYPE = {
  LOGIN: "/user/login",
  LOGOUT: "/user/logout",
  CHECK: "/user/check",
  REFRESH: "/user/refresh",
};

const login = (payload) => {
  return {
    type: TYPE.LOGIN,
    payload,
  };
};

const logout = () => {
  return {
    type: TYPE.LOGOUT,
  };
};

const check = (userInfo) => {
  return {
    type: TYPE.CHECK,
    payload: {
      currServerName: userInfo ? userInfo.server : "",
      currUserName: userInfo ? userInfo.name : "",
    },
  };
};

const refresh = () => {
  return {
    type: TYPE.REFRESH,
  };
};

export const action = { login, logout, check, refresh };

export const initialize = {};

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.LOGIN:
      return payload ? payload : initialize;

    case TYPE.LOGOUT:
      return state;

    case TYPE.CHECK:
      return {
        currServerName: payload.currServerName
          ? payload.currServerName
          : state.currServerName,
        currUserName: payload.currUserName
          ? payload.currUserName
          : state.currUserName,
      };

    case TYPE.REFRESH:
      return { currServerName: "", currUserName: "" };
    default:
      return state;
  }
};
