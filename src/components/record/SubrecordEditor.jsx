import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import RecordFormContainer from '../../containers/record/RecordFormContainer';
import SubrecordDetachButton from '../../components/record/SubrecordDetachButton';
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
  showDetachButton: PropTypes.bool,
  detachSubrecord: PropTypes.func,
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
      showDetachButton,
      subrecordConfig,
    } = this.props;

    const detachButton = (showDetachButton && isExistingRecord(data))
      ? <SubrecordDetachButton onClick={this.handleDetachButtonClick} />
      : null;

    return (
      <div className={styles.common}>
        <div>
          <RecordFormContainer
            config={config}
            recordType={subrecordConfig.recordType}
            vocabulary={subrecordConfig.vocabulary}
            csid={csid}
            data={data}
            formName={formName}
          />
        </div>

        {detachButton}
      </div>
    );
  }
}

SubrecordEditor.propTypes = propTypes;
