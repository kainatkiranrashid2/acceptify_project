// import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OurClients from "./components/OurClients/OurClients";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <Router className="">
      <div className="relative min-h-screen w-full bg-gradient-to-br from-[#6E3BFB] to-[#2D79FF] dark:from-[#2E1969] dark:to-[#000] overflow-hidden">
        {/* Main white glow effect */}
        <div className="absolute -top-48 -left-32 w-[376px] h-[376px] bg-white rounded-full blur-3xl"></div>

        {/* Secondary smaller glow for intensity */}
        <div className="absolute -top-5 -left-5 w-32 h-32 bg-white/30 rounded-full blur-3xl"></div>

        <Navbar />

        <main className="overflow-hidden m-0 p-0   text-dark -z-10 isolate">
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<OurClients />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
