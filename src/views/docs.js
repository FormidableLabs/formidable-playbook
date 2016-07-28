import React from "react";
import Radium from "radium";
import { Link } from "react-router";
import { indexOf } from "lodash";
import Page from "../components/page";
import Documentation from "../components/documentation";
import config from "../config";
import NotFound from "./not-found";
import theme from "../playbook-theme";
import NextRead from "../components/next-read";
import DocsHeader from "../components/docs-header";

class Docs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: { file: "" },
      loadingError: false
    };
  }

  componentWillMount() {
    this.getCurrentDocs(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getCurrentDocs(nextProps.location.pathname);
    }
  }

  getCurrentDocs(location) {
    let docsComponent = { file: "" };
    let counter = 0;
    config.forEach((doc) => {
      if (doc.route === location || `${doc.route}/` === location) {
        docsComponent = doc;
        return false;
      }
      counter++;
    });

    this.setState({
      docs: docsComponent,
      loadingError: counter === config.length
    });
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
    if (this.state.loadingError) {
      return <NotFound />;
    }

    return (
      <Page name="docs">
        <DocsHeader />
        <main style={styles.main}>
          <Link to="/" style={styles.homeLink}>&larr; Return Home</Link>
          <Documentation markdown={this.state.docs.file} />
          <NextRead currentIndex={indexOf(config, this.state.docs)} />
        </main>
      </Page>
    );
  }
}

Docs.propTypes = {
  location: React.PropTypes.object
};

export default Radium(Docs);
