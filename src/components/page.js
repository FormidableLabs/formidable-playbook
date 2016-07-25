import React from "react";

const Page = function ({name, children}) {
  return <div className={`page-${name}`}>{children}</div>;
};

Page.propTypes = {
  name: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};

export default Page;
