import * as Api from "../Utils/Api";

const handleSignUp = async (forms) => {
  try {
    const { data } = await Api.post("signup", forms);
    if (data.status === "success") {
      return data.data;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSignIn = async (forms) => {
  try {
    const { data } = await Api.post("login", forms);
    if (data.status === "success") {
      console.log(data);
      return data.data;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const logOut = () => {
  return Api.post("logout").then((res) => {
    return res;
  });
};

const AuthService = {
  //  CallIsAuth: isAuth,
  CallLogOut: logOut,
  CallSignIn: handleSignIn,
  CallSignUp: handleSignUp,
};

export default AuthService;
