import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../store/app-context";

function Protected({ isLoggedIn, children }) {
  const user = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
