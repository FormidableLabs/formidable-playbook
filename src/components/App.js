/* eslint-disable global-require */
import React from "react";
import Radium, { Style, StyleRoot } from "radium";

import stylesheet from "../playbook-stylesheet";

class App extends React.Component {
  render() {
    const styleRootStyles = {
      display: "flex",
      flexDirection: "column"
    };

    return (
      <StyleRoot style={styleRootStyles}>
        {this.props.children}
        <Style rules={stylesheet}/>
      </StyleRoot>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default Radium(App);
