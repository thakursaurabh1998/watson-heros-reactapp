import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";
import "../App.css";

class MyNavbar extends Component {
  render() {
    return (
      <div className="App">
        <Navbar brand="Marvel vs DC" className="navb">
          <NavItem target="blank" href="https://www.ibm.com/watson/">
            IBM Watson
          </NavItem>
          <NavItem target="blank" href="https://topcoder.com">
            Topcoder
          </NavItem>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
