import Color from "color";
import theme from "./playbook-theme";

// begin stylesheet
export default {
  "*, *:before, *:after": {
    boxSizing: "inherit"
  },
  html: {
    backgroundColor: theme.charcoal,
    msTextSizeAdjust: "100%",
    WebkitTextSizeAdjust: "100%"
  },
  body: {
    backgroundColor: theme.white,
    boxSizing: "border-box",
    color: theme.black,
    fontFamily: theme.serif,
    fontSize: "16px",
    lineHeight: 1.4,
    margin: 0
  },
  "html, body": {
    overflowX: "hidden",
    height: "100%"
  },
  "body::selection, body::-moz-selection": {
    background: "#FFFEC2"
  },
  "article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary": {
    display: "block"
  },
  "h1, h2, h3, h4, h5, h6, ul, ol, dd, p, figure, pre, table, fieldset, hr, .highlight": {
    marginTop: "1.25rem",
    marginBottom: 0
  },
  "ul ul": {
    marginTop: "0"
  },
  "h1, h2, h3, h4, h5, h6, hgroup": {
    fontFamily: theme.sansSerif
  },
  a: {
    color: theme.red,
    transition: "color 150ms ease-in"
  },
  "a:hover": {
    color: Color(theme.red).darken(.2).hexString(),
    transition: "color 150ms ease-out"
  },
  p: {
    fontSize: "1rem",
    lineHeight: 1.4
  },
  "p > code, li > code, h1 > code, h2 > code, h3 > code, h4 > code, h5 > code, h6 > code": {
    padding: "0px 5px",
    paddingTop: "0.2em",
    paddingBottom: "0.2em",
    margin: "0px",
    fontSize: "85%",
    background: "rgba(0,0,0,0.05)",
    borderRadius: "3px"
  },
  li: {
    fontSize: "1rem",
    lineHeight: 1.8
  },
  img: {
    maxWidth: "100%"
  },
  h1: {
    fontSize: "3rem"
  },
  h2: {
    fontSize: "2rem"
  },
  h3: {
    fontSize: "1.5rem"
  },
  h4: {
    fontSize: "1.3125rem"
  },
  svg: {
    fill: "currentColor"
  }
};
