import Home from "./Pages/Home";
import AudioProvider from "./contex";
import AuthProvider from "./authContex";
import Auth from "./Pages/Auth";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import { ToastContainer } from "react-toastify";

import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <AudioProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/music" element={<Auth />}>
              <Route path="" element={<Home />} />
            </Route>
          </Routes>
        </AudioProvider>
      </AuthProvider>
    </>
  );
}

export default App;
