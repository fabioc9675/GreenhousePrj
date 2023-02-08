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
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/udea"
              element={<MainFrame dataConfig={dataConfig.Profile_UdeA} />}
            />
            <Route
              exact
              path="/jfk"
              element={<MainFrame dataConfig={dataConfig.Profile_JFK} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
