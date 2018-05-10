import React from 'react';
import PropTypes from 'prop-types';
import CreateButton from './CreateButton';
import RelateButton from './RelateButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  isCreatable: PropTypes.bool,
  isRelatable: PropTypes.bool,
  onCreateButtonClick: PropTypes.func,
  onRelateButtonClick: PropTypes.func,
};

const defaultProps = {
  isRelatable: true,
};

export default function RelatedRecordButtonBar(props) {
  const {
    isCreatable,
    isRelatable,
    onCreateButtonClick,
    onRelateButtonClick,
  } = props;

  if (!isRelatable) {
    return null;
  }

  const createButton = isCreatable
    ? <CreateButton onClick={onCreateButtonClick} />
    : undefined;

  return (
    <div className={styles.common}>
      {createButton}
      <RelateButton
        onClick={onRelateButtonClick}
      />
    </div>
  );
}

RelatedRecordButtonBar.propTypes = propTypes;
RelatedRecordButtonBar.defaultProps = defaultProps;
