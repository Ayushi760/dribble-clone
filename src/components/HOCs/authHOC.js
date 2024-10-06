import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../context/GlobalStateContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { state } = useContext(GlobalStateContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!state.isAuthenticated) {
        navigate("/login");
      }
    }, [state.isAuthenticated, navigate]);

    return state.isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;