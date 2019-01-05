import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import RecordForm from '../record/RecordForm';

const propTypes = {
  config: PropTypes.object,
  invocationItem: PropTypes.instanceOf(Immutable.Map),
  promptMessage: PropTypes.object,
  type: PropTypes.string,
};

export default class InvocationEditor extends Component {
  render() {
    const {
      config,
      invocationItem,
      promptMessage,
      type,
    } = this.props;

    const invocableName = 'coreAcquisition'; //invocationItem.get('name');
    const recordTypeConfig = get(config, ['invocables', type, invocableName]);

    if (!recordTypeConfig) {
      return (
        <FormattedMessage {...promptMessage} />
      );
    }

    return (
      <div>
        <RecordForm
          config={config}
          recordTypeConfig={recordTypeConfig}
          recordType="invocable"
        />
      </div>
    );
  }
}

InvocationEditor.propTypes = propTypes;
