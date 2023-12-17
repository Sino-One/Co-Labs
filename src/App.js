import "./App.css";
import ResponsiveAppBar from "./Components/Molecules/ResponsiveBar";
import Home from "./Components/Pages/Home";
import Structures from "./Components/Pages/Structures";
import Projects from "./Components/Pages/Projects";
import Blog from "./Components/Pages/Blog";
import Protected from "./Components/Atoms/Protected";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/Molecules/SignIn/SignIn";
import SignUp from "./Components/Molecules/SignUp/SignUp";
import Bases from "./Components/Molecules/SignUp/Bases";
import CreationStructure from "./Components/Molecules/SignUp/CreationStructure";
import UserPrefs from "./Components/Molecules/SignUp/UserPrefs";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./Services/AuthService";
import IsNotAuth from "./Components/Pages/IsNotAuth";

function App() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/userVerification",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setIsAuth(status);
        setUsername(user);
      } catch (error) {
        console.log(error);
      }
    };
    isAuthenticated();
  }, [cookies]);

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  const logOut = () => {
    AuthService.CallLogOut();
    removeCookie("token");
    navigate("/signIn");
  };

  return (
    <>
      <ResponsiveAppBar logOut={() => logOut()}></ResponsiveAppBar>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/creationStructure" element={<CreationStructure />} />
        <Route path="/" element={<IsNotAuth />} />
        <Route
          path="/home"
          element={
            <Protected isLoggedIn={cookies}>
              <Home />
            </Protected>
          }
        />
        <Route path="/userPrefs" element={<UserPrefs />} />
        <Route
          path="/structures"
          element={
            <Protected isLoggedIn={cookies}>
              <Structures />
            </Protected>
          }
        />
        <Route
          path="/projets"
          element={
            <Protected isLoggedIn={cookies}>
              <Projects />
            </Protected>
          }
        />
        <Route
          path="/mesProjets"
          element={
            <Protected isLoggedIn={cookies}>
              <Blog />
            </Protected>
          }
        />
        <Route
          path="/bases"
          element={
            <Protected isLoggedIn={cookies}>
              <Bases />
            </Protected>
          }
        />

        {/* <Route path="/auth" element={<Auth/>}/>
        <Route path="/modal" element={<Modal/>}/>
        <Route path="/sama" element={<Protected isLoggedIn={AuthService.CallIsAuth()}>
          <Sama/>
        </Protected>}/>
        <Route path="/voie" element={<Protected isLoggedIn={AuthService.CallIsAuth()}>
          <Voie/>
        </Protected>} />
        <Route path="/docs" element={<Protected isLoggedIn={AuthService.CallIsAuth()}>
          <Documents/>
        </Protected>}/>
        <Route path="/info" element={<Protected isLoggedIn={AuthService.CallIsAuth()}>
          <Info/>
        </Protected>}/>
        <Route path="/profile" element={<Protected isLoggedIn={AuthService.CallIsAuth()}>
          <Profile/>
        </Protected>}/>
        <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </>
  );
}

export default App;
