import React from 'react';
import qs from 'qs';
import { baseComponents as components } from 'cspace-input';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

const { DropdownMenuInput } = components;

const messages = defineMessages({
  sortBy: {
    id: 'search.sortBy',
    defaultMessage: 'Sort By',
  },
});

const updateSortBy = (sort, history, location) => {
  if (history) {
    const {
      search,
    } = location;

    const query = qs.parse(search.substring(1));

    query.sort = sort;

    const queryString = qs.stringify(query);

    history.push({
      pathname: location.pathname,
      search: `?${queryString}`,
      state: location.state,
    });
  }
};

export default function SortBy(props) {
  const { onSortChange, sort } = props;

  const prefix = <FormattedMessage {...messages.sortBy} />;
  const options = [
    {
      label: 'Object Number',
      value: 'objectNumber',
    },
    {
      label: 'Object Name',
      value: 'objectName',
    },
    {
      label: 'Object Name Controlled',
      value: 'objectNameControlled',
    },
    {
      label: 'Title',
      value: 'title',
    },
    {
      label: 'Updated At',
      value: 'updatedAt',
    },
    {
      label: 'Created At',
      value: 'createdAt',
    },
    {
      label: 'Computed Current Location',
      value: 'computedCurrentLocation',
    },
  ];

  const currentVal = sort || 'updatedAt';
  const input = (
    <DropdownMenuInput
      options={options}
      value={currentVal}
      onCommit={(path, value) => onSortChange(value)}
    />
  );

  return (
    <div>
      {prefix}
      {input}
    </div>
  );
}
