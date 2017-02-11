import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import {
  defineMessages,
  FormattedMessage,
  FormattedDate,
  FormattedTime,
} from 'react-intl';

import { Popover } from 'cspace-layout';

import {
  getUpdatedTimestamp,
  getUpdatedUser,
  getCreatedTimestamp,
  getCreatedUser,
} from '../../helpers/recordDataHelpers';

import AccountLabel from '../user/AccountLabel';
import styles from '../../../styles/cspace-ui/RecordHistory.css';

const messages = defineMessages({
  updated: {
    id: 'recordHistory.updated',
    defaultMessage: `{style, select,
      full {Updated {date} at {time} by {user}}
      dateTime {Updated {date} at {time}}
    }`,
  },
  created: {
    id: 'recordHistory.created',
    defaultMessage: `{style, select,
      full {Created {date} at {time} by {user}}
      dateTime {Created {date} at {time}}
    }`,
  },
});

const formatDate = timestamp => (
  timestamp
    ? <FormattedDate value={timestamp} day="numeric" month="short" year="numeric" />
    : null
);

const formatTime = timestamp => (
  timestamp
    ? <FormattedTime value={timestamp} />
    : null
);

const formatUserId = userId => (
  userId
    ? <AccountLabel userId={userId} />
    : ''
);

const propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
};

export default function RecordHistory(props) {
  const {
    data,
  } = props;

  const updatedTimestamp = getUpdatedTimestamp(data);
  const updatedUserId = getUpdatedUser(data);

  let updated = null;

  if (updatedTimestamp || updatedUserId) {
    updated = (
      <FormattedMessage
        {...messages.updated}
        values={{
          date: formatDate(updatedTimestamp),
          time: formatTime(updatedTimestamp),
          user: formatUserId(updatedUserId),
          style: updatedUserId ? 'full' : 'dateTime',
        }}
      />
    );
  }

  const createdTimestamp = getCreatedTimestamp(data);
  const createdUserId = getCreatedUser(data);

  let created = null;

  if (createdTimestamp || createdUserId) {
    created = (
      <FormattedMessage
        {...messages.created}
        values={{
          date: formatDate(createdTimestamp),
          time: formatTime(createdTimestamp),
          user: formatUserId(createdUserId),
          style: createdUserId ? 'full' : 'dateTime',
        }}
      />
    );
  }

  let history;

  if (updated && created) {
    history = (
      <Popover header={updated} align="right">
        <ul>
          <li>{updated}</li>
          <li>{created}</li>
        </ul>
      </Popover>
    );
  } else if (updated) {
    history = updated;
  } else if (created) {
    history = created;
  }

  return (
    <div className={styles.common}>
      {history}
    </div>
  );
}

RecordHistory.propTypes = propTypes;
