import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {
  defineMessages,
  FormattedMessage,
  FormattedDate,
  FormattedRelative,
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
      full {Updated {date} {time} by {user}}
      dateTime {Updated {date} {time}}
    }`,
  },
  created: {
    id: 'recordHistory.created',
    defaultMessage: `{style, select,
      full {Created {date} {time} by {user}}
      dateTime {Created {date} {time}}
    }`,
  },
  savedRelative: {
    id: 'recordHistory.savedRelative',
    defaultMessage: 'Saved {relativeTime}',
  },
  editing: {
    id: 'recordHistory.editing',
    defaultMessage: 'Editing',
  },
  saving: {
    id: 'recordHistory.saving',
    defaultMessage: 'Saving',
  },
});

const formatDate = timestamp => (
  timestamp
    ? <FormattedDate value={timestamp} day="numeric" month="short" year="numeric" />
    : null
);

const formatTime = timestamp => (
  timestamp
    ? <FormattedTime value={timestamp} hour="numeric" minute="numeric" second="numeric" />
    : null
);

const formatTimeRelative = timestamp => (
  timestamp
    ? <FormattedRelative value={timestamp} />
    : null
);

const formatUserId = userId => (
  userId
    ? <AccountLabel userId={userId} />
    : ''
);

const propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
};

export default class RecordHistory extends Component {
  constructor() {
    super();

    this.renderHistory = this.renderHistory.bind(this);
    this.handlePopoverBeforeClose = this.handlePopoverBeforeClose.bind(this);
    this.handlePopoverBeforeOpen = this.handlePopoverBeforeOpen.bind(this);

    // The header shows last saved time as a FormattedRelative that gets automatically updated at
    // most every ten seconds. The popup content also shows last saved time as a FormattedRelative,
    // but since it is mounted at a different time than the one in the header, the two can easily
    // be out of sync.
    // DRYD-169: Fix this by unmounting the one in the header when the popup is open, and
    // remounting it when the popup is closed, in order to force it to update to the same (or
    // greater) value as was shown in the popup.

    this.state = {
      showHeader: true,
    };
  }

  handlePopoverBeforeClose() {
    this.setState({
      showHeader: true,
    });
  }

  handlePopoverBeforeOpen() {
    this.setState({
      showHeader: false,
    });
  }

  renderCurrentState() {
    const {
      data,
      isModified,
      isSavePending,
    } = this.props;

    if (isSavePending) {
      return (
        <FormattedMessage {...messages.saving} />
      );
    }

    if (isModified) {
      return (
        <FormattedMessage {...messages.editing} />
      );
    }

    const updatedTimestamp = getUpdatedTimestamp(data);

    if (updatedTimestamp) {
      return (
        <FormattedMessage
          {...messages.savedRelative}
          key="saved"
          values={{
            relativeTime: formatTimeRelative(updatedTimestamp),
          }}
        />
      );
    }

    const createdTimestamp = getCreatedTimestamp(data);

    if (createdTimestamp) {
      return (
        <FormattedMessage
          {...messages.savedRelative}
          key="saved"
          values={{
            relativeTime: formatTimeRelative(createdTimestamp),
          }}
        />
      );
    }

    return null;
  }

  renderHistory() {
    const {
      data,
    } = this.props;

    const currentState = this.renderCurrentState();

    const updatedTimestamp = getUpdatedTimestamp(data);
    const updatedUserId = getUpdatedUser(data);

    let updated = null;

    if (updatedTimestamp) {
      updated = (
        <FormattedMessage
          {...messages.updated}
          key="updated"
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

    if (createdTimestamp) {
      created = (
        <FormattedMessage
          {...messages.created}
          key="created"
          values={{
            date: formatDate(createdTimestamp),
            time: formatTime(createdTimestamp),
            user: formatUserId(createdUserId),
            style: createdUserId ? 'full' : 'dateTime',
          }}
        />
      );
    }

    const items = [currentState, updated, created].filter(item => !!item);

    return (
      <ul>
        {items.map(item => <li key={item.key}>{item}</li>)}
      </ul>
    );
  }

  renderHeader() {
    const {
      showHeader,
    } = this.state;

    return (showHeader ? this.renderCurrentState() : <br />);
  }

  render() {
    const {
      data,
    } = this.props;

    let content;

    if (getUpdatedTimestamp(data) || getCreatedTimestamp(data)) {
      content = (
        <Popover
          align="right"
          header={this.renderHeader()}
          renderContent={this.renderHistory}
          onBeforeOpen={this.handlePopoverBeforeOpen}
          onBeforeClose={this.handlePopoverBeforeClose}
        />
      );
    } else {
      content = this.renderCurrentState();
    }

    return (
      <div className={styles.common}>
        {content}
      </div>
    );
  }
}

RecordHistory.propTypes = propTypes;
