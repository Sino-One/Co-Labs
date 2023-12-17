import axios from "axios";

const isAuth = () => {
  const { data } = axios.post(
    "http://localhost:5000/userVerification",
    {},
    { withCredentials: true }
  );
  console.log(data);
  return data;
};

const logOut = () => {
  axios.get("http://localhost:5000/logout", {}, { withCredentials: true });
};

const AuthService = {
  CallIsAuth: isAuth,
  CallLogOut: logOut,
};

export default AuthService;
