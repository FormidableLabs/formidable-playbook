import React from "react";
import Radium from "radium";
import theme from "../playbook-theme";

class Header extends React.Component {
  getStyles() {
    return {
      main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        backgroundColor: theme.red,
        backgroundImage: "url('./static/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        color: theme.white,
        textAlign: "center"
      },
      headerGroup: {
        padding: "1em"
      },
      mainHeading: {
        margin: "0px",
        fontSize: "58px",
        letterSpacing: ".02em",
        WebkitFontSmoothing: "antialiased",
        textShadow: "2px 2px 8px rgba(168, 37, 27,.3)"
      },
      subHeading: {
        fontSize: "20px",
        fontFamily: theme.serif,
        letterSpacing: ".02em",
        WebkitFontSmoothing: "antialiased",
        textShadow: "2px 2px 8px rgba(168, 37, 27,.3)"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <header style={styles.main}>
        <hgroup style={styles.headerGroup}>
          <h1 style={styles.mainHeading}>Formidable Playbook</h1>
          <h2 style={styles.subHeading}>A practical guide to building modern applications</h2>
        </hgroup>
      </header>
    );
  }
}

export default Radium(Header);
