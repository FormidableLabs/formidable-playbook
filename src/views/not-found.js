import React from "react";
import Page from "../components/page";
import NotFoundComponent from "../components/not-found";
import DocsHeader from "../components/docs-header";

const NotFound = function () {
  return (
    <Page name="notFound">
      <DocsHeader />
      <NotFoundComponent style={{margin: "2em auto"}}/>
    </Page>
  );
};

export default NotFound;
