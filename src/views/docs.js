import React from "react";
import Radium from "radium";
import { Link } from "react-router";
import Page from "../components/page";
import Documentation from "../components/documentation";
import config from "../config";
import NotFound from "./not-found";
import theme from "../playbook-theme";
import NextRead from "../components/next-read";
import DocsHeader from "../components/docs-header";

class Docs extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  getStyles() {
    return {
      main: {
        width: "100%",
        maxWidth: `calc(${theme.container} + ${theme.gutter})`,
        margin: `${theme.gutter} auto`,
        padding: theme.gutter
      },
      homeLink: {
        fontSize: "1rem",
        textDecoration: "none"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    let Component = <NotFound />;

    config.forEach((doc) => {
      if (doc.route === this.props.location.pathname) {
        Component = (
          <Page name="docs">
            <DocsHeader />
            <main style={styles.main}>
              <Link to="/" style={styles.homeLink}>&larr; Return Home</Link>
              <Documentation markdown={require(`!!raw!../../docs${doc.route}.md`)}/>
              <NextRead current={this.props.location.pathname} />
            </main>
          </Page>
        );
      }
    });
    return Component;
  }
}

Docs.propTypes = {
  location: React.PropTypes.object
};

export default Radium(Docs);
