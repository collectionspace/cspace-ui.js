import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SidebarToggleButton from '../navigation/SidebarToggleButton';

const propTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
  isRecordSidebarOpen: PropTypes.bool,
  toggleRecordSidebar: PropTypes.func,
};

const defaultProps = {
  isRecordSidebarOpen: true,
};

export default function RecordSidebarToggleButton(props) {
  const {
    config,
    recordType,
    isRecordSidebarOpen,
    toggleRecordSidebar,
  } = props;

  const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);
  const isAuthority = serviceType === 'authority';

  return (
    <SidebarToggleButton
      color={isAuthority ? 'purple' : 'blue'}
      isOpen={isRecordSidebarOpen}
      toggle={toggleRecordSidebar}
    />
  );
}

RecordSidebarToggleButton.propTypes = propTypes;
RecordSidebarToggleButton.defaultProps = defaultProps;
