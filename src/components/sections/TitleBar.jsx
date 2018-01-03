/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  }

  componentDidUpdate() {
    // If the height of the title bar content changes while the title bar is docked, fire onDocked
    // in order to notify listeners of the new height.

    const node = this.domNode;

    if (node && this.state.docked) {
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

  setDomNode(ref) {
    this.domNode = ref;
  }

  handleScroll() {
    const {
      onDocked,
    } = this.props;

    const node = this.domNode;

    if (!node) return;

    if (this.state.docked) {
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
