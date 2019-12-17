/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/Dock.css';

const propTypes = {
  children: PropTypes.element,
  dockTop: PropTypes.number,
  isSidebarOpen: PropTypes.bool,
};

const defaultProps = {
  isSidebarOpen: true,
};

export default class Dock extends Component {
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

    const {
      dockTop,
    } = this.props;

    const {
      docked,
    } = this.state;

    if (docked) {
      if ((window.scrollY + dockTop) < node.offsetTop) {
        this.setState({
          docked: false,
        });
      }
    } else if ((window.scrollY + dockTop) >= node.offsetTop) {
      this.setState({
        docked: true,
      });
    }
  }

  render() {
    const {
      children,
      dockTop,
      isSidebarOpen,
    } = this.props;

    const {
      docked,
    } = this.state;

    const className = classNames(
      isSidebarOpen ? styles.normal : styles.full,
      { [styles.docked]: docked },
    );

    const inlineStyle = docked
      ? { height: this.domNode.offsetHeight }
      : {};

    const innerInlineStyle = docked
      ? { top: (dockTop || 0) }
      : {};

    return (
      <header
        className={className}
        style={inlineStyle}
        ref={this.setDomNode}
      >
        <div style={innerInlineStyle}>
          {children}
        </div>
      </header>
    );
  }
}

Dock.propTypes = propTypes;
Dock.defaultProps = defaultProps;
