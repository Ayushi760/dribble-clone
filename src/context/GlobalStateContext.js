import React, { createContext, useReducer } from "react";

export const GlobalStateContext = createContext();

const initialState = {
  users: [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: JSON.parse(localStorage.getItem("currentUser"))
    ? true
    : false,
  loading: false,
  error: null,
  categories: []
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_CATEGORIES": 
      return { 
        ...state, 
        categories: action.payload 
      };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  React.useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [state.currentUser]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};