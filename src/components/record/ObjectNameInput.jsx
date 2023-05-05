import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import { baseComponents as inputComponents } from 'cspace-input';
import { getRecordTypeNameByServiceObjectName } from '../../helpers/configHelpers';

const { RecordTypeInput } = inputComponents;

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
};

export default class ObjectNameInput extends Component {
  constructor(props) {
    super(props);

    this.handleCommit = this.handleCommit.bind(this);
  }

  handleCommit(path, recordType) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const {
        config,
      } = this.context;

      const objectName = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);

      onCommit(path, objectName || recordType);
    }
  }

  getRecordTypes() {
    const {
      config,
    } = this.context;

    return pickBy(config.recordTypes, (recordTypeConfig) => {
      const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

      return (
        serviceType === 'procedure'
        || serviceType === 'object'
        || serviceType === 'authority'
      );
    });
  }

  render() {
    const {
      value: objectName,
    } = this.props;

    const {
      config,
    } = this.context;

    let recordType = objectName && getRecordTypeNameByServiceObjectName(config, objectName);

    if (typeof recordType === 'undefined') {
      recordType = null;
    }

    return (
      <RecordTypeInput
        {...this.props}
        recordTypes={this.getRecordTypes()}
        value={recordType}
        onCommit={this.handleCommit}
      />
    );
  }
}

ObjectNameInput.propTypes = RecordTypeInput.propTypes;
ObjectNameInput.contextTypes = contextTypes;
