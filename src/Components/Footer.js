import React, { Component } from "react";
import { Footer } from "react-materialize";

class MyFooter extends Component {
  render() {
    return (
      <Footer
        style={{position:"absolute", bottom:"0", width:"100vw"}}
        copyrights="Made with React"
        moreLinks={
          <a
            target="blank"
            className="grey-text text-lighten-4 right"
            href="https://github.com/thakursaurabh1998"
          >
            Made By Saurabh Thakur
          </a>
        }
        className="example"
      />
    );
  }
}

export default MyFooter;
