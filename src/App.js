import "./App.css";
import ResponsiveAppBar from "./Components/Molecules/ResponsiveBar";
import Home from "./Components/Pages/Home";
import Structures from "./Components/Pages/Structures";
import Projects from "./Components/Pages/Projects";
import Blog from "./Components/Pages/Blog";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/Molecules/SignIn";
import SignUp from "./Components/Molecules/SignOut";

function App() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/structures" element={<Structures />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/mesProjets" element={<Blog />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
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
