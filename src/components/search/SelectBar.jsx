import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/SelectBar.css';
import buttonBarStyles from '../../../styles/cspace-ui/ButtonBar.css';

const messages = defineMessages({
  selected: {
    id: 'selectBar.selected',
    description: 'Label showing the number of selected items.',
    defaultMessage: `{selectedCount, plural,
      =0 {0 selected}
      other {# selected}
    }`,
  },
});

const propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  selectedCount: PropTypes.number,
};

export default function SelectBar(props) {
  const {
    selectedCount,
    buttons,
  } = props;

  let buttonBar = null;

  if (buttons && buttons.length > 0) {
    buttonBar = (
      <div className={buttonBarStyles.common}>
        {buttons}
      </div>
    );
  }

  return (
    <div className={styles.common}>
      <div>
        <FormattedMessage {...messages.selected} values={{ selectedCount }} />
      </div>
      {buttonBar}
    </div>
  );
}

SelectBar.propTypes = propTypes;
