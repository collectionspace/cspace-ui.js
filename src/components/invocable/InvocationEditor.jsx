import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { getBatchName, getReportName } from '../../helpers/invocationHelpers';
import RecordFormContainer from '../../containers/record/RecordFormContainer';
import styles from '../../../styles/cspace-ui/InvocationModal.css';

const propTypes = {
  config: PropTypes.object,
  data: PropTypes.instanceOf(Immutable.Map),
  invocationItem: PropTypes.instanceOf(Immutable.Map),
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
      data,
      invocationItem,
      promptMessage,
      type,
    } = this.props;

    const invocableName = (type === 'report')
      ? getReportName(invocationItem)
      : getBatchName(invocationItem);

    const recordTypeConfig = get(config, ['invocables', type, invocableName]);

    if (!recordTypeConfig) {
      return (
        <FormattedMessage {...promptMessage} />
      );
    }

    return (
      <div>
        <RecordFormContainer
          className={styles.common}
          config={config}
          csid=""
          data={data}
          recordTypeConfig={recordTypeConfig}
          recordType="invocable"
        />
      </div>
    );
  }
}

InvocationEditor.propTypes = propTypes;
