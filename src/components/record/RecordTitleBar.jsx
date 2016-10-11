/* global window */

import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordTitleBar.css';

export default class RecordTitleBar extends Component {
  constructor(props, context) {
    super(props, context);

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
      // isReadPending,
      recordType,
    } = this.props;

    const {
      docked,
    } = this.state;

    const {
      recordPlugins,
    } = this.context;

    const recordPlugin = recordPlugins[recordType];

    if (!recordPlugin) {
      return null;
    }

    const cspaceDocument = data ? data.get(DOCUMENT_PROPERTY_NAME) : undefined;
    const className = docked ? styles.docked : styles.common;
    const inlineStyle = docked ? { height: this.domNode.offsetHeight } : {};

    return (
      <header
        className={className}
        ref={this.setDomNode}
        style={inlineStyle}
      >
        <div className={styles.inner}>
          <h1 className={styles.title}>
            {recordPlugin.pageTitle(cspaceDocument)}
          </h1>
          <h2 className={styles.recordType}>
            <FormattedMessage {...recordPlugin.messageDescriptors.recordNameTitle} />
          </h2>
        </div>
      </header>
    );
  }
}

RecordTitleBar.propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
  // isReadPending: PropTypes.bool,
  recordType: PropTypes.string,
};

RecordTitleBar.contextTypes = {
  recordPlugins: PropTypes.object,
};
