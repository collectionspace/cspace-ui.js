import React from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../record/CreateButton';
import styles from '../../../styles/cspace-ui/RolesButtonBar.css';

const propTypes = {
  isCreatable: PropTypes.bool,
  onCreateButtonClick: PropTypes.func,
};

export default function RolesButtonBar(props) {
  const {
    isCreatable,
    onCreateButtonClick,
  } = props;

  if (!isCreatable) {
    return null;
  }

  return (
    <div className={styles.common}>
      <CreateButton onClick={onCreateButtonClick} />
    </div>
  );
}

RolesButtonBar.propTypes = propTypes;
