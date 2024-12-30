import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Components/Routes/AuthContext";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import StaticData from "./Static/StaticData.json";

const Home = lazy(() => import("./Components/Home"));
const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));
const Feature = lazy(() => import("./Components/Feature"));
const Login = lazy(() => import("./Components/Login"));
const SignUp = lazy(() => import("./Components/SignUp"));
const Dashboard = lazy(() => import("./Components/Dashboard"));

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar StaticData={StaticData} windowWidth={windowWidth} />
        <div style={{ height: "86px" }} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home StaticData={StaticData} />} />
            <Route path="/about" element={<About StaticData={StaticData} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Feature />} />
            <Route path="/login" element={<Login StaticData={StaticData} />} />
            <Route
              path="/signup"
              element={<SignUp StaticData={StaticData} />}
            />
            <Route path="/features" element={<Feature />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute
                  element={<Dashboard windowWidth={windowWidth} />}
                />
              }
            />
          </Routes>
        </Suspense>
        <Footer StaticData={StaticData} windowWidth={windowWidth} />
      </Router>
    </AuthProvider>
  );
};

export default App;
