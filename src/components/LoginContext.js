import { createContext, useReducer } from "react";

export const LoginContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // add case "USER_SUCCESS" here ..
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      // Set localstorage item with key "token" here ...
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    // add case "AUTH_ERROR" here ..
    case "AUTH_ERROR":
    case "LOGOUT":
      // Remove localstorage item with key "token" here ...
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const LoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginContext.Provider value={[state, dispatch]}>
      {children}
    </LoginContext.Provider>
  );
};
