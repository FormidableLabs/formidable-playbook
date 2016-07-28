import React from "react";
import Radium from "radium";
import theme from "../playbook-theme";

const DocsHeader = function () {
  const styles = {
    inner: {
      width: "100%",
      maxWidth: `calc(${theme.container} + ${theme.gutter})`,
      margin: `0px auto`
    },
    header: {
      padding: theme.gutter,
      backgroundColor: theme.red,
      backgroundImage: "url('./static/hero.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      color: theme.white,
      textDecoration: "none",
      textShadow: "2px 2px 8px rgba(168, 37, 27,.5)"
    },
    heading: {
      fontSize: "2rem",
      [`@media ${theme.breakpoints.medium}`]: {
        fontSize: "3rem"
      }
    },
    subheading: {
      fontSize: "1rem",
      margin: ".25em 0em 1em",
      [`@media ${theme.breakpoints.medium}`]: {
        fontSize: "1.2rem"
      }
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <h1 style={styles.heading}>Formidable Playbook</h1>
        <div style={styles.subheading}>A practical guide to building modern applications</div>
      </div>
    </header>
  );
};

export default Radium(DocsHeader);
