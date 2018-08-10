import React, { Component } from "react";
import Data from "./Components/Data";
import MyNavbar from "./Components/Navbar"
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNavbar />
        <Data />
      </div>
    );
  }
}

export default App;
