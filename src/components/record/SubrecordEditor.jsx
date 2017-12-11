import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import RecordFormContainer from '../../containers/record/RecordFormContainer';
import SubrecordDetachButton from '../../components/record/SubrecordDetachButton';
import { canRead, canCreate, canUpdate } from '../../helpers/permissionHelpers';
import { isExistingRecord } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/SubrecordEditor.css';

const propTypes = {
  config: PropTypes.object,
  subrecordConfig: PropTypes.object,
  containerCsid: PropTypes.string,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
  name: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  showDetachButton: PropTypes.bool,
  detachSubrecord: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default class SubrecordEditor extends Component {
  constructor() {
    super();

    this.handleDetachButtonClick = this.handleDetachButtonClick.bind(this);
  }

  handleDetachButtonClick() {
    const {
      config,
      containerCsid,
      name,
      subrecordConfig,
      detachSubrecord,
    } = this.props;

    const subrecordTypeConfig = get(config, ['recordTypes', subrecordConfig.recordType]);

    if (detachSubrecord) {
      detachSubrecord(config, containerCsid, subrecordConfig.csidField, name, subrecordTypeConfig);
    }
  }

  render() {
    const {
      config,
      csid,
      data,
      formName,
      perms,
      showDetachButton,
      subrecordConfig,
      readOnly,
    } = this.props;

    const {
      recordType,
      vocabulary,
    } = subrecordConfig;

    if (!canRead(recordType, perms)) {
      return null;
    }

    const subrecordReadOnly = (
      readOnly ||
      !(csid ? canUpdate(recordType, perms) : canCreate(recordType, perms))
    );

    const detachButton = (showDetachButton && !readOnly && isExistingRecord(data))
      ? <SubrecordDetachButton onClick={this.handleDetachButtonClick} />
      : null;

    return (
      <div className={styles.common}>
        <div>
          <RecordFormContainer
            config={config}
            recordType={recordType}
            vocabulary={vocabulary}
            csid={csid}
            data={data}
            formName={formName}
            readOnly={subrecordReadOnly}
          />
        </div>

        {detachButton}
      </div>
    );
  }
}

SubrecordEditor.propTypes = propTypes;
