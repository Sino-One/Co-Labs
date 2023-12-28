import * as Api from "../Utils/Api";

const isAuth = async () => {
  const { data } = await Api.post("userVerification", {});
  console.log(data);
  return data;
};

const logOut = () => {
  Api.get("logout");
};

const AuthService = {
  CallIsAuth: isAuth,
  CallLogOut: logOut,
};

export default AuthService;
