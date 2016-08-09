/* eslint-disable global-require */
import React from "react";
import Radium, { Style, StyleRoot } from "radium";
import ga from "react-ga";
import { Header, Footer } from "formidable-landers";

import stylesheet from "../playbook-stylesheet";
import theme from "../playbook-theme";

class App extends React.Component {
  componentDidMount() {
    ga.initialize("UA-43290258-1");
  }

  render() {
    const styleRootStyles = {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    };
    const isBrowser = typeof window !== "undefined" && window.__STATIC_GENERATOR !== true;
    return (
      <StyleRoot
        radiumConfig={isBrowser ? { userAgent: window.navigator.userAgent } : null}
        style={styleRootStyles}
      >
        <Style rules={stylesheet} />
        <Header
          background={theme.white}
          linkStyles={{
            color: theme.charcoal,
            fontFamily: theme.serif,
            textDecoration: "none",
            ":hover": {
              color: theme.red
            }
          }}
        />
        {this.props.children}
        <Footer background={`${theme.white} url('./static/footer.jpg') no-repeat top center`} />
      </StyleRoot>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
  location: React.PropTypes.object.isRequired
};

export default Radium(App);
