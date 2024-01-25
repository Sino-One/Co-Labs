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
import { useNavigate } from "react-router-dom";
import AuthService from "./Services/AuthService";
import IsNotAuth from "./Components/Pages/IsNotAuth";
import { AppContext } from "./store/app-context";

function App() {
  const navigate = useNavigate();
  // const [cookies, removeCookie] = useCookies([]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  const logOut = () => {
    AuthService.CallLogOut();
    //   removeCookie("");
    navigate("/signIn");
  };

  return (
    <>
      <AppContext.Provider value={{ user: null, structures: [] }}>
        <ResponsiveAppBar logOut={() => logOut()}></ResponsiveAppBar>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/creationStructure" element={<CreationStructure />} />
          <Route path="/" element={<IsNotAuth />} />
          <Route
            path="/home"
            element={
              <Protected isLoggedIn={isAuth}>
                <Home />
              </Protected>
            }
          />
          <Route path="/userPrefs" element={<UserPrefs />} />
          <Route
            path="/structures"
            element={
              <Protected isLoggedIn={isAuth}>
                <Structures />
              </Protected>
            }
          />
          <Route
            path="/projets"
            element={
              <Protected isLoggedIn={isAuth}>
                <Projects />
              </Protected>
            }
          />
          <Route
            path="/mesProjets"
            element={
              <Protected isLoggedIn={isAuth}>
                <Blog />
              </Protected>
            }
          />
          <Route path="/bases" element={<Bases />} />

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
      </AppContext.Provider>
    </>
  );
}

export default App;
