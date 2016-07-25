import React from "react";
import Header from "./Header";
import Radium, { Style, StyleRoot } from "radium";

import stylesheet from "../playbook-stylesheet";

class App extends React.Component {
  render() {
    return (
      <StyleRoot>
        <Header />
        <div>React App</div>
        <Style rules={stylesheet}/>
      </StyleRoot>
    );
  }
}

export default Radium(App);
