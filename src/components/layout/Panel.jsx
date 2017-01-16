import React, { Component, PropTypes } from 'react';
import styles from '../../../styles/cspace-ui/Panel.css';

const propTypes = {
  children: PropTypes.node,
  collapsible: React.PropTypes.bool,
  collapsed: React.PropTypes.bool,
  header: PropTypes.node,
  name: PropTypes.string,
  onToggleCollapsed: PropTypes.func,
};

const defaultProps = {
  collapsible: false,
  collapsed: false,
};

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleHeaderClick() {
    const {
      collapsible,
      collapsed,
      name,
      onToggleCollapsed,
    } = this.props;

    if (collapsible && onToggleCollapsed) {
      onToggleCollapsed(name, !collapsed);
    }
  }

  renderHeader() {
    const {
      header,
    } = this.props;

    if (!header) {
      return null;
    }

    return (
      <header>
        <button type="button" onClick={this.handleHeaderClick}>
          {header}
        </button>
      </header>
    );
  }

  renderBody() {
    const {
      collapsible,
      collapsed,
      children,
    } = this.props;

    if (collapsible && collapsed) {
      return null;
    }

    return (
      <div>
        {children}
      </div>
    );
  }

  render() {
    const header = this.renderHeader();
    const body = this.renderBody();

    const {
      collapsible,
      collapsed,
    } = this.props;

    const className = (collapsible && collapsed) ? styles.collapsed : styles.normal;

    return (
      <section className={className}>
        {header}
        {body}
      </section>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
