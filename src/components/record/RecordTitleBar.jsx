/* global window */

import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
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
      recordType,
    } = this.props;

    const {
      docked,
    } = this.state;

    const {
      recordTypePlugins,
    } = this.context;

    const recordTypePlugin = recordTypePlugins[recordType];

    if (!recordTypePlugin) {
      return null;
    }

    const doc = data ? data.get('document') : undefined;
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
            {recordTypePlugin.pageTitle(doc)}
          </h1>
          <h2 className={styles.recordType}>
            <FormattedMessage {...recordTypePlugin.messageDescriptors.recordNameTitle} />
          </h2>
        </div>
      </header>
    );
  }
}

RecordTitleBar.propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
  isReadPending: PropTypes.bool,
  recordType: PropTypes.string,
  recordTypePlugins: PropTypes.object,
  title: PropTypes.string,
};

RecordTitleBar.contextTypes = {
  recordTypePlugins: PropTypes.object,
};
