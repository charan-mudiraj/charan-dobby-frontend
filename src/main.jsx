import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { isBackendUpAtom } from "./atoms";
import CircularProgress from "@mui/joy/CircularProgress";
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
import axios from "axios";

function Root() {
  const navigate = useNavigate();
  const setIsUp = useSetRecoilState(isBackendUpAtom);
  useEffect(() => {
    // Start the server and do not wait for res
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/`).then((res) => {
      res.status == 200 && setIsUp(true);
    });
    const userID = window.localStorage.getItem("userID-dobby");
    if (userID) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);
  return null;
}
export function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress size="lg" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RecoilRoot>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Root />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Suspense>
    </RecoilRoot>
  </BrowserRouter>
);
