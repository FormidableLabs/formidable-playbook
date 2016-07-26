import React from "react";
import Radium from "radium";
import { Link } from "react-router";
import { findIndex } from "lodash";
import config from "../config";
import theme from "../playbook-theme";

const NextRead = function ({current}) {
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      margin: "3rem 0rem 0rem",
      paddingTop: "2rem",
      borderTop: `1px solid ${theme.offWhite}`
    },
    link: {
      fontSize: "1.2rem"
    },
    prev: {
      display: "flex",
      flexDirection: "column"
    },
    next: {
      display: "flex",
      flexDirection: "column"
    }
  };

  const currPos = findIndex(config, {route: current});
  const next = config[currPos + 1];
  const prev = config[currPos - 1];
  return (
    <div style={styles.wrapper}>
      <div>
        {prev ?
          <div style={styles.prev}>
            <span>Previous Guide</span>
            <Link to={prev.route} style={styles.link}>{prev.label}</Link>
          </div>
         : null}
      </div>
      <div>
        {next ?
          <div style={styles.next}>
            <span>Next Guide</span>
            <Link to={next.route} style={styles.link}>{next.label}</Link>
          </div>
           : null}
      </div>
    </div>
  );

};

NextRead.propTypes = {
  current: React.PropTypes.string.isRequired
};

NextRead.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Radium(NextRead);
