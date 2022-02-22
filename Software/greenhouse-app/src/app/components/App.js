import React, { Component } from "react";
import MainFrame from "./MainFrame";
import Home from "./Home";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

// import data of configuration
import dataConfig from "../../dataConfig/dataConfig.json";

export default function App() {
  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/udea"
              element={<MainFrame dataConfig={dataConfig.Profile_UdeA} />}
            />
            <Route
              path="/jfk"
              element={<MainFrame dataConfig={dataConfig.Profile_JFK} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
