/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/TitleBar.css';
import subtitleStyles from '../../../styles/cspace-ui/Subtitle.css';

const propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  aside: PropTypes.node,
  icon: PropTypes.node,
  nav: PropTypes.node,
  serviceType: PropTypes.string,
  updateDocumentTitle: PropTypes.bool,
  onDocked: PropTypes.func,
};

export default class TitleBar extends Component {
  constructor(props) {
    super(props);

    this.setDomNode = this.setDomNode.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      docked: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      documentTitle: this.getDocumentTitle(),
    });
  }

  componentDidUpdate(prevProps) {
    const node = this.domNode;

    // Update the document title, if necessary.

    const {
      updateDocumentTitle,
    } = this.props;

    if (updateDocumentTitle) {
      const {
        title,
        aside,
      } = this.props;

      const {
        title: prevTitle,
        aside: prevAside,
      } = prevProps;

      if (title !== prevTitle || aside !== prevAside) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          documentTitle: this.getDocumentTitle(),
        });
      }
    }

    // If the height of the title bar content changes while the title bar is docked, fire onDocked
    // in order to notify listeners of the new height.

    const {
      docked,
    } = this.state;

    if (node && docked) {
      const contentNode = node.firstElementChild;

      if (contentNode.offsetHeight !== this.dockedHeight) {
        this.dockedHeight = contentNode.offsetHeight;

        const {
          onDocked,
        } = this.props;

        if (onDocked) {
          onDocked(this.dockedHeight);
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  getDocumentTitle() {
    const titleNode = this.domNode.querySelector('h1');
    const titleText = titleNode ? titleNode.textContent : null;

    const asideNode = this.domNode.querySelector('aside');
    const asideText = asideNode ? asideNode.textContent : null;

    return [titleText, asideText].filter((part) => !!part).join(' | ');
  }

  setDomNode(ref) {
    this.domNode = ref;
  }

  handleScroll() {
    const {
      onDocked,
    } = this.props;

    const node = this.domNode;

    if (!node) return;

    const {
      docked,
    } = this.state;

    if (docked) {
      if (window.scrollY < node.offsetTop) {
        this.setState({
          docked: false,
        });
      }
    } else if (window.scrollY >= node.offsetTop) {
      this.dockedHeight = node.offsetHeight;

      this.setState({
        docked: true,
      });

      if (onDocked) {
        onDocked(this.dockedHeight);
      }
    }
  }

  renderDocumentTitle() {
    const {
      updateDocumentTitle,
    } = this.props;

    if (!updateDocumentTitle) {
      return null;
    }

    const {
      documentTitle,
    } = this.state;

    return (
      <Helmet>
        <title>{documentTitle}</title>
      </Helmet>
    );
  }

  renderNav() {
    const {
      nav,
    } = this.props;

    return nav;
  }

  renderTitle() {
    const {
      title,
    } = this.props;

    return (
      <h1>{title}</h1>
    );
  }

  renderAside() {
    const {
      aside,
    } = this.props;

    if (aside !== null && typeof aside !== 'undefined') {
      return (
        <aside><h2>{aside}</h2></aside>
      );
    }

    return null;
  }

  renderSubtitle() {
    const {
      subtitle,
    } = this.props;

    if (subtitle !== null && typeof subtitle !== 'undefined') {
      return (
        <div className={subtitleStyles.common}>{subtitle}</div>
      );
    }

    return null;
  }

  render() {
    const {
      docked,
    } = this.state;

    const {
      icon,
      serviceType,
    } = this.props;

    const className = classNames(styles[serviceType], docked ? styles.docked : styles.common);
    const inlineStyle = docked ? { height: this.domNode.offsetHeight } : {};

    return (
      <header
        className={className}
        ref={this.setDomNode}
        style={inlineStyle}
      >
        {this.renderDocumentTitle()}
        <div>
          {this.renderNav()}
          <div>
            {icon}
            {this.renderTitle()}
            {this.renderAside()}
          </div>
          {this.renderSubtitle()}
        </div>
      </header>
    );
  }
}

TitleBar.propTypes = propTypes;
