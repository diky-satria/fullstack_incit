export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const authLogin = (payload: any) => {
  return {
    type: AUTH_LOGIN,
    payload,
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
