import React from 'react';
import PropTypes from 'prop-types';
import { baseComponents as components } from 'cspace-input';
import {
  defineMessages, FormattedMessage, injectIntl, intlShape,
} from 'react-intl';

import { get } from 'lodash';
import styles from '../../../styles/cspace-ui/SortBy.css';
import { useConfig } from '../config/ConfigProvider';

const { DropdownMenuInput, MiniButton } = components;

const messages = defineMessages({
  sortBy: {
    id: 'search.sortBy',
    defaultMessage: 'Sort By',
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
  const sortConfig = get(config, ['recordTypes', recordType, 'sort']);

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

  const sortDirClass = sortDir ? styles.descending : styles.ascending;
  const sortDirButton = (
    <MiniButton
      className={sortDirClass}
      onClick={() => onSortDirChange()}
    />
  );

  const prefix = <FormattedMessage {...messages.sortBy} />;

  return (
    <div>
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
