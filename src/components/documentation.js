import React from "react";
import MarkdownIt from "markdown-it";

class Documentation extends React.Component {
  componentWillMount() {
    this.setMarkdownRender();
  }

  setMarkdownRender() {
    const md = new MarkdownIt({
      html: true,
      linkify: true
    });
    this.md = md;
  }

  render() {
    return <div className="md" dangerouslySetInnerHTML={{__html: this.md.render(this.props.markdown)}} />;
  }
}

Documentation.propTypes = {
  markdown: React.PropTypes.string.isRequired
};

export default Documentation;
