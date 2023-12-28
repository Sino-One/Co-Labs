import { Navigate } from "react-router-dom";

function Protected({ isLoggedIn, children }) {
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
