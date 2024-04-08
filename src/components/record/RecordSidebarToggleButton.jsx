import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SidebarToggleButton from '../navigation/SidebarToggleButton';
import sidebarToggleBarStyles from '../../../styles/cspace-ui/SidebarToggleBar.css';

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
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
    <div className={sidebarToggleBarStyles.common}>
      <SidebarToggleButton
        color={isAuthority ? 'purple' : 'blue'}
        isOpen={isRecordSidebarOpen}
        toggle={toggleRecordSidebar}
      />
    </div>
  );
}

RecordSidebarToggleButton.propTypes = propTypes;
RecordSidebarToggleButton.defaultProps = defaultProps;
