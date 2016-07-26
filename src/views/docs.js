import React from "react";
import Radium from "radium";
import { includes } from "lodash";
import Page from "../components/page";
import Documentation from "../components/documentation";
import staticRoutes from "../../static-routes";
import NotFound from "./not-found";
import theme from "../playbook-theme";

const Docs = function (props) {
  if (includes(staticRoutes, props.location.pathname)) {
    const styles = {
      main: {
        width: "100%",
        maxWidth: `calc(${theme.container} + ${theme.gutter})`,
        margin: `${theme.gutter} auto`,
        padding: theme.gutter
      }
    };

    return (
      <Page name="docs">
        <main styles={styles.main}>
          <Documentation markdown={require(`../../docs${props.location.pathname}.md`)} />
        </main>
      </Page>
    );
  } else {
    return <NotFound />;
  }
};

Docs.propTypes = {
  location: React.PropTypes.object
};

export default Radium(Docs);
