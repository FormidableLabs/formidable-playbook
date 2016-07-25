import React from "react";
import Page from "../components/Page";
import Header from "../components/Header";
import Documentation from "../components/Documentation";
import Radium from "radium";

import theme from "../playbook-theme";

const Home = function () {

  const styles = {
    main: {
      width: "100%",
      maxWidth: `calc(${theme.container} + ${theme.gutter})`,
      margin: `${theme.gutter} auto`,
      padding: theme.gutter
    },
    paragraph: {}
  };

  return (
    <Page name="home">
      <Header />
      <main style={styles.main}>
        <Documentation markdown={require("!!raw!../../docs/README.md")}/>
      </main>
    </Page>
  );
};

export default Radium(Home);
