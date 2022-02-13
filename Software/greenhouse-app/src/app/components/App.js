import React, { Component } from "react";
import MainFrame from "./MainFrame";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// import data of configuration
import dataConfig from "../../dataConfig/dataConfig.json";

export default function App() {
  return <MainFrame dataConfig={dataConfig.Profile_UdeA} />;
}
