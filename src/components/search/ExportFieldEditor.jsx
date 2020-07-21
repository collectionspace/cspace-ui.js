import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import FieldInput from './input/FieldInput';
import styles from '../../../styles/cspace-ui/ExportFieldEditor.css';

import {
  getRecordFieldOptionListName,
  getRecordGroupOptionListName,
} from '../../helpers/configHelpers';

const propTypes = {
  config: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
  includeFields: PropTypes.instanceOf(Immutable.List),
  recordType: PropTypes.string,
  buildRecordFieldOptionLists: PropTypes.func,
  deleteOptionList: PropTypes.func,
  onIncludeFieldsAddInstance: PropTypes.func,
  onIncludeFieldsCommit: PropTypes.func,
  onIncludeFieldsMoveInstance: PropTypes.func,
  onIncludeFieldsRemoveInstance: PropTypes.func,
};

const { RepeatingInput } = inputComponents;

const messages = defineMessages({
  prompt: {
    id: 'exportFieldEditor.prompt',
    description: 'Prompt message in the field editor for exports.',
    defaultMessage: 'Select fields to include.',
  },
});

export default class ExportFieldEditor extends Component {
  constructor(props) {
    super(props);

    this.handleIncludeFieldsAddInstance = this.handleIncludeFieldsAddInstance.bind(this);
    this.handleIncludeFieldsCommit = this.handleIncludeFieldsCommit.bind(this);
    this.handleIncludeFieldsMoveInstance = this.handleIncludeFieldsMoveInstance.bind(this);
    this.handleIncludeFieldsRemoveInstance = this.handleIncludeFieldsRemoveInstance.bind(this);
  }

  componentDidMount() {
    const {
      config,
      recordType,
      buildRecordFieldOptionLists,
    } = this.props;

    if (buildRecordFieldOptionLists) {
      buildRecordFieldOptionLists(config, recordType);
    }
  }

  componentWillUnmount() {
    const {
      recordType,
      deleteOptionList,
    } = this.props;

    if (deleteOptionList) {
      deleteOptionList(getRecordFieldOptionListName(recordType));
      deleteOptionList(getRecordGroupOptionListName(recordType));
    }
  }

  handleIncludeFieldsAddInstance(path, position) {
    const {
      onIncludeFieldsAddInstance,
    } = this.props;

    if (onIncludeFieldsAddInstance) {
      onIncludeFieldsAddInstance(position);
    }
  }

  handleIncludeFieldsCommit(path, value) {
    const {
      onIncludeFieldsCommit,
    } = this.props;

    if (onIncludeFieldsCommit) {
      onIncludeFieldsCommit(path[0], value);
    }
  }

  handleIncludeFieldsMoveInstance(path, newPosition) {
    const {
      onIncludeFieldsMoveInstance,
    } = this.props;

    if (onIncludeFieldsMoveInstance) {
      onIncludeFieldsMoveInstance(path[1], newPosition);
    }
  }

  handleIncludeFieldsRemoveInstance(path) {
    const {
      onIncludeFieldsRemoveInstance,
    } = this.props;

    if (onIncludeFieldsRemoveInstance) {
      onIncludeFieldsRemoveInstance(path[1]);
    }
  }

  render() {
    const {
      config,
      includeFields,
      recordType,
    } = this.props;

    return (
      <div className={styles.common}>
        <p><FormattedMessage {...messages.prompt} /></p>

        <RepeatingInput
          name="includeFields"
          value={includeFields}
          onAddInstance={this.handleIncludeFieldsAddInstance}
          onCommit={this.handleIncludeFieldsCommit}
          onMoveInstance={this.handleIncludeFieldsMoveInstance}
          onRemoveInstance={this.handleIncludeFieldsRemoveInstance}
        >
          <FieldInput
            config={config}
            embedded
            recordType={recordType}
          />
        </RepeatingInput>
      </div>
    );
  }
}

ExportFieldEditor.propTypes = propTypes;
