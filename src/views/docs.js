import React from "react";
import Radium from "radium";
import { Link } from "react-router";
import Page from "../components/page";
import Documentation from "../components/documentation";
import config from "../config";
import NotFound from "./not-found";
import theme from "../playbook-theme";
import NextRead from "../components/next-read";

const Docs = function (props) {
  const styles = {
    main: {
      width: "100%",
      maxWidth: `calc(${theme.container} + ${theme.gutter})`,
      margin: `${theme.gutter} auto`,
      padding: theme.gutter
    },
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
    homeLink: {
      fontSize: "1rem",
      textDecoration: "none"
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

  let Component = <NotFound />;

  config.forEach((doc) => {
    if (doc.route === props.location.pathname) {
      Component = (
        <Page name="docs">
          <header style={styles.header}>
            <div style={styles.inner}>
              <h1 style={styles.heading}>Formidable Playbook</h1>
              <div style={styles.subheading}>A practical guide to building modern applications</div>
            </div>
          </header>
          <main style={styles.main}>
            <Link to="/" style={styles.homeLink}>&larr; Return Home</Link>
            <Documentation markdown={require(`!!raw!../../docs${doc.route}.md`)}/>
            <NextRead current={props.location.pathname} />
          </main>
        </Page>
      );
    }
  });
  return Component;
};

Docs.propTypes = {
  location: React.PropTypes.object
};

export default Radium(Docs);
