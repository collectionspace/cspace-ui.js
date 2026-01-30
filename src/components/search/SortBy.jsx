import React from 'react';
import PropTypes from 'prop-types';
import { baseComponents as components } from 'cspace-input';
import {
  defineMessages, injectIntl, intlShape,
} from 'react-intl';

import { get } from 'lodash';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/SortBy.css';
import { useConfig } from '../config/ConfigProvider';

const { DropdownMenuInput, Button } = components;

const messages = defineMessages({
  sortBy: {
    id: 'search.sortBy',
    defaultMessage: 'Sort By',
  },
  ascendingLabel: {
    id: 'search.sortDir.ascending.label',
    defaultMessage: 'Current sort: ascending',
  },
  descendingLabel: {
    id: 'search.sortDir.descending.label',
    defaultMessage: 'Current sort: descending',
  },
});

function SortBy({
  intl,
  onSortChange,
  onSortDirChange,
  recordType,
  sort,
}) {
  const config = useConfig();
  const sortConfig = get(config, ['recordTypes', recordType, 'sort'])
    ?? get(config, ['recordTypes', recordType, 'columns', 'default']);

  if (!sortConfig) {
    return null;
  }

  const {
    defaultSortBy = 'updatedAt',
    defaultSortDir = 'desc',
  } = sortConfig;

  const options = Object.keys(sortConfig)
    .filter((key) => sortConfig[key].sortBy !== undefined)
    .map((key) => {
      const option = sortConfig[key];
      const label = intl.formatMessage(option.messages.label) ?? key;

      return {
        value: key,
        label,
      };
    });

  const [sortBy, sortDir] = sort?.split(' ') ?? [defaultSortBy, defaultSortDir];
  const input = (
    <DropdownMenuInput
      options={options}
      value={sortBy}
      onCommit={(path, value) => onSortChange(value)}
    />
  );

  const sortDirLabel = sortDir ? intl.formatMessage(messages.descendingLabel)
    : intl.formatMessage(messages.ascendingLabel);
  const sortDirButton = (
    <Button
      title={sortDirLabel}
      className="material-icons"
      onClick={() => onSortDirChange()}
    >
      sort_by_alpha
    </Button>
  );

  const prefixMessage = intl.formatMessage(messages.sortBy);
  const prefix = <span className={classNames(styles.mt2, styles.mr5)}>{prefixMessage}</span>;

  return (
    <div className={styles.flex}>
      {prefix}
      {input}
      {sortDirButton}
    </div>
  );
}

SortBy.propTypes = {
  intl: intlShape,
  onSortChange: PropTypes.func,
  onSortDirChange: PropTypes.func,
  recordType: PropTypes.string,
  sort: PropTypes.string,
};

export default injectIntl(SortBy);
