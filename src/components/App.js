/* eslint-disable global-require */
import React from "react";
import Radium, { Style, StyleRoot } from "radium";
import Home from "../screens/Home";

import stylesheet from "../playbook-stylesheet";

class App extends React.Component {
  render() {
    const styleRootStyles = {
      display: "flex",
      flexDirection: "column"
    };

    return (
      <StyleRoot style={styleRootStyles}>
        <Home />
        <Style rules={stylesheet}/>
      </StyleRoot>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node
};

export default Radium(App);
