import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import RecordFormContainer from '../../containers/record/RecordFormContainer';

const propTypes = {
  config: PropTypes.object,
  // invocationItem: PropTypes.instanceOf(Immutable.Map),
  promptMessage: PropTypes.object,
  type: PropTypes.string,
  createNewRecord: PropTypes.func,
};

export default class InvocationEditor extends Component {
  componentDidMount() {
    this.initRecord();
  }

  initRecord() {
    const {
      createNewRecord,
    } = this.props;

    createNewRecord();
  }

  render() {
    const {
      config,
      // invocationItem,
      promptMessage,
      type,
    } = this.props;

    const invocableName = 'coreAcquisition'; // TODO: invocationItem.get('filename');
    const recordTypeConfig = get(config, ['invocables', type, invocableName]);

    if (!recordTypeConfig) {
      return (
        <FormattedMessage {...promptMessage} />
      );
    }

    return (
      <div>
        <RecordFormContainer
          config={config}
          csid=""
          recordTypeConfig={recordTypeConfig}
          recordType="invocable"
        />
      </div>
    );
  }
}

InvocationEditor.propTypes = propTypes;
