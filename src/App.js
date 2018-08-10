import React, { Component } from "react";
import logo from "./logo.svg";
import Data from "./Components/Data";
import MyNavbar from "./Components/Navbar"
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNavbar />
        <div style={{ textAlign: "center" }}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Data />
      </div>
    );
  }
}

export default App;
