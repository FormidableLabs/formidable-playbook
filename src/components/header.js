import React from "react";
import Radium from "radium";
import theme from "../playbook-theme";
import GITHUB_LOGO from "../../static/logo-github.svg";

class Header extends React.Component {
  getStyles() {
    return {
      main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "380px",
        backgroundColor: theme.red,
        backgroundImage: "url('./static/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        color: theme.white,
        textAlign: "center",
        [`@media ${theme.breakpoints.medium}`]: {
          height: "500px"
        }
      },
      headerGroup: {
        padding: "1em"
      },
      mainHeading: {
        margin: "0px",
        fontSize: "3em",
        letterSpacing: ".02em",
        WebkitFontSmoothing: "antialiased",
        textShadow: "2px 2px 8px rgba(168, 37, 27,.5)",
        [`@media ${theme.breakpoints.medium}`]: {
          fontSize: "4rem"
        }
      },
      subHeading: {
        fontSize: "1.1rem",
        fontFamily: theme.serif,
        letterSpacing: ".02em",
        fontWeight: 100,
        WebkitFontSmoothing: "antialiased",
        textShadow: "2px 2px 8px rgba(168, 37, 27,.5)",
        [`@media ${theme.breakpoints.medium}`]: {
          fontSize: "1.4rem"
        }
      },
      githubLink: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "80px",
        color: theme.white,
        fontFamily: theme.serif,
        WebkitFontSmoothing: "antialiased",
        textDecoration: "none",
        textShadow: "2px 2px 8px rgba(168, 37, 27,.5)"
      },
      githubLinkLogo: {
        width: "1.2rem",
        height: "1.2rem",
        marginRight: "8px",
        WebkitFilter: "drop-shadow(2px 2px 8px rgba(168, 37, 27,.5))",
        filter: "drop-shadow(2px 2px 8px rgba(168, 37, 27,.5))"
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
          <a style={styles.githubLink} href="https://github.com/FormidableLabs/formidable-playbook" target="_blank">
          <span style={styles.githubLinkLogo} dangerouslySetInnerHTML={{__html: GITHUB_LOGO}}/>
          <span style={{textAlign: "left"}}>FormidableLabs/formidable-playbook</span>
          </a>
        </hgroup>
      </header>
    );
  }
}

export default Radium(Header);
