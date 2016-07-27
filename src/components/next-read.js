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
      flexDirection: "column",
      justifyContent: "space-between",
      margin: "3rem 0rem 0rem",
      paddingTop: "0px",
      borderTop: `1px solid ${theme.offWhite}`,
      [`@media ${theme.breakpoints.medium}`]: {
        paddingTop: "1rem",
        flexDirection: "row"
      }
    },
    link: {
      fontSize: "1.2rem"
    },
    nextprev: {
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      borderBottom: `1px solid ${theme.offWhite}`,
      textAlign: "center",
      [`@media ${theme.breakpoints.medium}`]: {
        borderBottom: "none",
        textAlign: "left"
      }
    }
  };

  const currPos = findIndex(config, {route: current});
  const next = config[currPos + 1];
  const prev = config[currPos - 1];
  return (
    <div style={styles.wrapper}>
      <div>
        {prev ?
          <div style={[styles.nextprev, styles.prev]}>
            <span>Previous Guide</span>
            <Link to={prev.route} style={styles.link}>{prev.label}</Link>
          </div>
         : null}
      </div>
      <div>
        {next ?
          <div style={[styles.nextprev, styles.next]}>
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
