import React from "react";
import MarkdownIt from "markdown-it";
import MarkdownItNamedHeaders from "markdown-it-named-headers";

class Documentation extends React.Component {
  componentWillMount() {
    this.setMarkdownRender();
  }

  setMarkdownRender() {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    md.use(MarkdownItNamedHeaders);

    /* eslint-disable camelcase, max-params */
    // store the original rule
    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, renderer) {
      return renderer.renderToken(tokens, idx, options);
    };

    // Update anchors that point to markdown files
    md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
      const aIndex = tokens[idx].attrIndex("href");
      if (aIndex >= 0) {
        const mdHref = tokens[idx].attrs[aIndex][1].match(".md");
        if (mdHref) {
          tokens[idx].attrs[aIndex][1] = mdHref.input.substring(0, mdHref.index);
        }
      }
      return defaultRender(tokens, idx, options, env, renderer);
    };

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
