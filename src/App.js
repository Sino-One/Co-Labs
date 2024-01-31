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
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./Services/AuthService";
import IsNotAuth from "./Components/Pages/IsNotAuth";
import CreateProject from "./Components/Pages/CreateProject";
import { UserContext } from "./store/UserReducer";
import { StructuresContext } from "./store/StructuresReducer";
import StructureService from "./Services/StructureService";
import StructuresContextProvider from "./store/StructuresReducer";
import UserContextProvider from "./store/UserReducer";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { setStructures } = useContext(StructuresContext);

  useEffect(() => {
    if (user) {
      fetchStructures();
    }
  }, [user]);

  const fetchStructures = async () => {
    await StructureService.getAllStructures().then((structures) => {
      setStructures(structures);
    });
  };

  return (
    <>
      <UserContextProvider>
        <StructuresContextProvider>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Routes>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/creationStructure" element={<CreationStructure />} />
            <Route path="/" element={<IsNotAuth />} />
            <Route
              path="/home"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route path="/userPrefs" element={<UserPrefs />} />
            <Route
              path="/structures"
              element={
                <Protected>
                  <Structures />
                </Protected>
              }
            />
            <Route
              path="/projets"
              element={
                <Protected>
                  <Projects />
                </Protected>
              }
            />
            <Route
              path="/mesProjets"
              element={
                <Protected>
                  <Blog />
                </Protected>
              }
            />
            <Route
              path="/createProject"
              element={
                <Protected>
                  <CreateProject />
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
        </StructuresContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
