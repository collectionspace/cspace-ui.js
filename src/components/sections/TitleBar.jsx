/* global window */

import React, { Component, PropTypes } from 'react';
import styles from '../../../styles/cspace-ui/TitleBar.css';

const propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  nav: PropTypes.node,
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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  setDomNode(ref) {
    this.domNode = ref;
  }

  handleScroll() {
    const node = this.domNode;

    if (!node) return;

    if (this.state.docked) {
      if (window.scrollY < node.offsetTop) {
        this.setState({
          docked: false,
        });
      }
    } else if (window.scrollY >= node.offsetTop) {
      this.setState({
        docked: true,
      });
    }
  }

  renderNav() {
    const {
      nav,
    } = this.props;

    if (nav) {
      return (
        <nav>{nav}</nav>
      );
    }

    return null;
  }

  renderTitle() {
    const {
      title,
    } = this.props;

    return (
      <h1>{title}</h1>
    );
  }

  renderSubtitle() {
    const {
      subtitle,
    } = this.props;

    if (subtitle !== null && typeof subtitle !== 'undefined') {
      return (
        <h2>{subtitle}</h2>
      );
    }

    return null;
  }

  render() {
    const {
      docked,
    } = this.state;

    const className = docked ? styles.docked : styles.common;
    const inlineStyle = docked ? { height: this.domNode.offsetHeight } : {};

    return (
      <header
        className={className}
        ref={this.setDomNode}
        style={inlineStyle}
      >
        <div className={styles.inner}>
          {this.renderNav()}
          <div>
            {this.renderTitle()}
            {this.renderSubtitle()}
          </div>
        </div>
      </header>
    );
  }
}

TitleBar.propTypes = propTypes;
