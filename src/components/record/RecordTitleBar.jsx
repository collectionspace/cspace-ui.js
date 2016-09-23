/* global window */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/RecordTitleBar.css';

export default class RecordTitleBar extends Component {
  constructor(props, context) {
    super(props, context);

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

  handleScroll() {
    const node = this.domNode;

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

  render() {
    const {
      data,
      service,
    } = this.props;

    const {
      docked,
    } = this.state;

    const {
      records,
    } = this.context;

    const record = records[service];

    if (!record) {
      return null;
    }

    const className = docked ? styles.docked : styles.common;
    const inlineStyle = docked ? { height: this.domNode.offsetHeight } : {};

    return (
      <header
        className={className}
        ref={(ref) => { this.domNode = ref; }}
        style={inlineStyle}
      >
        <div className={styles.inner}>
          <h1 className={styles.title}>
            {record.pageTitle(data)}
          </h1>
          <h2 className={styles.recordType}>
            <FormattedMessage {...record.messageDescriptors.recordNameTitle} />
          </h2>
        </div>
      </header>
    );
  }
}

RecordTitleBar.propTypes = {
  data: PropTypes.object,
  service: PropTypes.string,
  title: PropTypes.string,
};

RecordTitleBar.contextTypes = {
  records: React.PropTypes.object,
};
