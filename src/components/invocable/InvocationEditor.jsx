import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import InvocationDescriptorEditor from './InvocationDescriptorEditor';
import { getRecordTypeNameByServiceObjectName } from '../../helpers/configHelpers';
import { getCommonFieldValue } from '../../helpers/recordDataHelpers';
import RecordFormContainer from '../../containers/record/RecordFormContainer';
import styles from '../../../styles/cspace-ui/InvocationEditor.css';
import warningStyles from '../../../styles/cspace-ui/Warning.css';

const messages = defineMessages({
  loading: {
    id: 'invocationEditor.loading',
    description: 'Message displayed when invocable metadata is loading.',
    defaultMessage: 'Loading…',
  },
  noDescription: {
    id: 'invocationEditor.noDescription',
    description: 'Message displayed when an invocable has no description.',
    defaultMessage: 'Description not provided.',
  },
});

const renderLoading = () => (
  <div className={styles.pending}>
    <FormattedMessage {...messages.loading} />
  </div>
);

const propTypes = {
  allowedModes: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.object,
  invocationDescriptor: PropTypes.instanceOf(Immutable.Map),
  modeReadOnly: PropTypes.bool,
  invocationTargetReadOnly: PropTypes.bool,
  isInvocationTargetModified: PropTypes.bool,
  metadata: PropTypes.instanceOf(Immutable.Map),
  paramData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  createNewRecord: PropTypes.func,
  onInvocationDescriptorCommit: PropTypes.func,
};

export default class InvocationEditor extends Component {
  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.metadata !== this.props.metadata) {
      this.init();
    }
  }

  getSupportedModes() {
    const {
      allowedModes,
      metadata,
    } = this.props;

    let modes = [];

    if (getCommonFieldValue(metadata, 'supportsNoContext') === 'true') {
      modes.push('nocontext');
    }

    if (getCommonFieldValue(metadata, 'supportsDocList') === 'true') {
      modes.push('list');
    }

    if (getCommonFieldValue(metadata, 'supportsGroup') === 'true') {
      modes.push('group');
    }

    if (getCommonFieldValue(metadata, 'supportsSingleDoc') === 'true') {
      modes.push('single');
    }

    if (allowedModes) {
      modes = modes.filter(mode => allowedModes.includes(mode));
    }

    return modes;
  }

  getSupportedRecordTypes() {
    const {
      config,
      metadata,
    } = this.props;

    const forDocTypesContainer = getCommonFieldValue(metadata, 'forDocTypes');

    let forDocTypes = forDocTypesContainer && forDocTypesContainer.get('forDocType');

    if (forDocTypes) {
      if (!Immutable.List.isList(forDocTypes)) {
        forDocTypes = Immutable.List.of(forDocTypes);
      }

      const recordTypes = forDocTypes.map(
        forDocType => getRecordTypeNameByServiceObjectName(config, forDocType)
      ).toJS();

      return recordTypes;
    }

    return [];
  }

  init() {
    const {
      createNewRecord,
    } = this.props;

    // Create a params record.

    createNewRecord();
  }

  render() {
    const {
      config,
      invocationDescriptor,
      modeReadOnly,
      invocationTargetReadOnly,
      isInvocationTargetModified,
      metadata,
      paramData,
      recordType,
      onInvocationDescriptorCommit,
    } = this.props;

    if (!metadata) {
      return renderLoading();
    }

    const invocableNameGetter = get(config, ['recordTypes', recordType, 'invocableName']);
    const invocableName = invocableNameGetter && invocableNameGetter(metadata);

    const paramRecordTypeConfig = get(config, ['invocables', recordType, invocableName]);

    const description = getCommonFieldValue(metadata, 'notes')
      || <FormattedMessage {...messages.noDescription} />;

    const recordTypeConfig = get(config, ['recordTypes', recordType]);
    const recordTypeMessages = get(recordTypeConfig, ['messages', 'record']);

    let unsavedWarning;

    if (isInvocationTargetModified) {
      unsavedWarning = (
        <p className={warningStyles.common}>
          <FormattedMessage {...recordTypeMessages.invokeUnsaved} />
        </p>
      );
    }

    return (
      <div className={styles.common}>
        <p>{description}</p>

        <InvocationDescriptorEditor
          config={config}
          invocationDescriptor={invocationDescriptor}
          modes={this.getSupportedModes()}
          modeReadOnly={modeReadOnly}
          invocationTargetReadOnly={invocationTargetReadOnly}
          recordTypes={this.getSupportedRecordTypes()}
          onCommit={onInvocationDescriptorCommit}
        />

        {unsavedWarning}

        <RecordFormContainer
          config={config}
          csid=""
          data={paramData}
          recordType="invocable"
          recordTypeConfig={paramRecordTypeConfig}
        />
      </div>
    );
  }
}

InvocationEditor.propTypes = propTypes;
