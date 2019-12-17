import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'cspace-layout';
import MiniViewContainer from '../../containers/record/MiniViewContainer';
import MiniView from './MiniView';
import styles from '../../../styles/cspace-ui/MiniViewPopup.css';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...Popup.propTypes,
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...MiniView.propTypes,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  domRef: PropTypes.func,
};

export default function MiniViewPopup(props) {
  const {
    onMouseEnter,
    style,
    domRef,
    ...remainingProps
  } = props;

  return (
    <div
      className={styles.common}
      ref={domRef}
      style={style}
      onMouseEnter={onMouseEnter}
    >
      <Popup>
        <MiniViewContainer
          {...remainingProps}
        />
      </Popup>
    </div>
  );
}

MiniViewPopup.propTypes = propTypes;
