import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createPortal } from "react-dom"; // Import createPortal
import { globalVar } from "../globalContext/GlobalContext";
import LoginPage from "../pages/LoginPage";

const ProtectedRoute = ({ children }) => {
  let { loginPanel, setLoginPanel } = useContext(globalVar);
  const token = localStorage.getItem("auth");

  useEffect(() => {
    // If no token is found, open the login panel
    if (!token) {
      setLoginPanel(true);
    }
  }, [token, setLoginPanel]);

  // If the token exists, render the protected content
  if (token) {
    return children;
  }

  // If loginPanel is true, show the login modal using createPortal
  return <>{loginPanel && createPortal(<LoginPage />, document.body)}</>;
};

export default ProtectedRoute;
