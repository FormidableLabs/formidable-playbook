import React from "react";
import Radium from "radium";
import { Link } from "react-router";

const NotFound = function ({message}) {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      margin: "2em auto",
      textAlign: "center"
    },
    message: {
      marginTop: "1rem"
    },
    heading: {
      marginTop: "1rem"
    },
    link: {
      marginTop: "1rem"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Not Found</h2>
      <div style={styles.message}>{message}</div>
      <div style={styles.link}><Link to="/">Playbook Home</Link></div>
    </div>
  );
};

NotFound.defaultProps = {
  message: "We're sorry! It looks like this page doesn't exist."
};

NotFound.propTypes = {
  message: React.PropTypes.string
};

export default Radium(NotFound);
