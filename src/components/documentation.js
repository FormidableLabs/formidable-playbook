import React from "react";
import MarkdownIt from "markdown-it";
import MarkdownItNamedHeaders from "markdown-it-named-headers";
import basename from "../basename";

class Documentation extends React.Component {
  componentWillMount() {
    this.setMarkdownRender(this.context.location.pathname);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    // Pathname has changed
    if (nextContext.location.pathname !== this.context.location.pathname) {
      this.setMarkdownRender(nextContext.location.pathname);
    }
  }

  setMarkdownRender(currentPath) {
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
        let href = tokens[idx].attrs[aIndex][1];
        // if it's a relative link
        if (href.indexOf("http") !== 0) {
          // replace .md with /
          href = href.replace(".md", "/");
          // sibling/parent links need backtracked one dir
          if (href.indexOf('.') === 0) {
            if (href.indexOf("./") === 0) {
              href = "." + href;
            } else if (href.indexOf("../") === 0) {
              href = "../" + href;
            }
            // prefix with / if our currentPath doesn't have a trailing slash
            if (currentPath[currentPath.length - 1] !== "/") {
              href = "/" + href;
            }
          }
          // prefix with basename/currentpath to accommodate base href
          href = `${basename}${currentPath}${href}`;
        }
        tokens[idx].attrs[aIndex][1] = href;
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

Documentation.contextTypes = {
  location: React.PropTypes.object.isRequired
};

export default Documentation;
