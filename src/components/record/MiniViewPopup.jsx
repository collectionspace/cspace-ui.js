import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'cspace-layout';
import MiniView from './MiniView';
import styles from '../../../styles/cspace-ui/MiniViewPopup.css';

const propTypes = {
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMount: PropTypes.func,
};

export default function MiniViewPopup(props) {
  const {
    onBlur,
    onKeyDown,
    onMount,
    ...remainingProps
  } = props;

  return (
    <div
      className={styles.common}
    >
      <Popup
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onMount={onMount}
      >
        <MiniView
          {...remainingProps}
        />
      </Popup>
    </div>
  );
}

MiniViewPopup.propTypes = propTypes;
