import React from 'react';
import { Popup } from 'cspace-layout';
import MiniViewContainer from '../../containers/record/MiniViewContainer';
import MiniView from './MiniView';
import styles from '../../../styles/cspace-ui/MiniViewPopup.css';

const propTypes = {
  ...Popup.propTypes,
  ...MiniView.propTypes,
};

export default function MiniViewPopup(props) {
  const {
    onBlur,
    onKeyDown,
    onMouseLeave,
    popupMiniInlineStyle,
    ...remainingProps
  } = props;

  return (
    <div
      className={styles.common}
      style={popupMiniInlineStyle}
    >
      <Popup
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onMouseLeave={onMouseLeave}
      >
        <MiniViewContainer
          {...remainingProps}
        />
      </Popup>
    </div>
  );
}

MiniViewPopup.propTypes = propTypes;
