import "./App.css";
import ResponsiveAppBar from "./Components/Molecules/ResponsiveBar";
import Home from "./Components/Pages/Home";
import Projects from "./Components/Pages/Projects";
import Protected from "./Components/Atoms/Protected";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/Molecules/SignIn/SignIn";
import SignUp from "./Components/Molecules/SignUp/SignUp";
import Bases from "./Components/Molecules/SignUp/Bases";
import CreationStructure from "./Components/Molecules/SignUp/CreationStructure";
import UserPrefs from "./Components/Molecules/SignUp/UserPrefs";
import { useContext, useEffect } from "react";
import IsNotAuth from "./Components/Pages/IsNotAuth";
import CreateProject from "./Components/Pages/CreateProject";
import { UserContext } from "./store/UserReducer";
import { StructuresContext } from "./store/StructuresReducer";
import StructureService from "./Services/StructureService";
import StructuresContextProvider from "./store/StructuresReducer";
import UserContextProvider from "./store/UserReducer";
import Map from "./Components/Atoms/Map";
import Structure from "./Components/Pages/Structure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profil from "./Components/Pages/Profil";
import * as Api from "./Utils/Api";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { setStructures } = useContext(StructuresContext);

  useEffect(() => {
    if (user) {
      fetchStructures();
    }
  }, [user]);

  const fetchUser = () => {
    if (user) {
      Api.post("getUser", { id: user._id }).then((res) => {
        setUser(res.data);
      });
    }
  };

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
                  <Map />
                </Protected>
              }
            />
            <Route
              path="/structure/:id"
              element={
                <Protected>
                  <Structure />
                </Protected>
              }
            />
            <Route
              path="/mesProjets"
              element={
                <Protected>
                  <Projects />
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
            <Route
              path="/profil"
              element={
                <Protected>
                  <Profil />
                </Protected>
              }
            />
            <Route path="/bases" element={<Bases />} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </StructuresContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
