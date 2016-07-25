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
        <p style={styles.paragraph}>
          This is our playbook. It is the foundation that allows us to architect & design systems that move our client projects forward.  In it, you will find practical approaches for building frontend & backend javascript applications. This is a living document, and we intend to share our knowledge as we continue to work towards making the web a better place.
        </p>
        <Documentation markdown={require("!!raw!../../docs/README.md")}/>
      </main>
    </Page>
  );
};

export default Radium(Home);
