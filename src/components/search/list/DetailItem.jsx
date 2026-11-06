import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { useConfig } from '../../config/ConfigProvider';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../../constants/searchNames';

import styles from '../../../../styles/cspace-ui/SearchList.css';
import SearchResultCheckbox from '../SearchResultCheckbox';
import SearchResultImage from '../SearchResultImage';

const { Button } = inputComponents;

const propTypes = {
  intl: intlShape,
  item: PropTypes.instanceOf(Immutable.Map),
  index: PropTypes.number,
  detailConfig: PropTypes.shape({
    aside: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    title: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    subtitle: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    description: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    tags: PropTypes.shape({
      formatter: PropTypes.func,
    }),
    footer: PropTypes.shape({
      formatter: PropTypes.func,
    }),
  }),
  searchDescriptor: PropTypes.object,
  listType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
};

const messages = defineMessages({
  editButton: {
    id: 'searchDetailList.editLabel',
    description: 'Label for the edit record button',
    defaultMessage: 'Edit Record',
  },
  editButtonScreenReader: {
    id: 'searchDetailList.editScreenReader',
    description: 'Text for screen readers to distinguish the record being edited. Used in conjunction with searchDetailList.editLabel for the aria-label.',
    defaultMessage: 'for {recordId}',
  },
});

const DETAIL_DERIVATIVE = 'Small';

const renderEditButton = (location, state, intl, objectNumber) => {
  const buttonLabel = intl.formatMessage(messages.editButton);
  const buttonAriaText = intl.formatMessage(messages.editButtonScreenReader,
    { recordId: objectNumber });
  const button = (
    <Button name="edit" aria-label={`${buttonLabel} ${buttonAriaText}`}>
      <span>{buttonLabel}</span>
    </Button>
  );
  return location ? (
    <Link to={{ pathname: location, state }} tabIndex="-1">
      {button}
    </Link>
  ) : button;
};

function DetailItem({
  intl, item, index, detailConfig, searchDescriptor, listType, selectedItems,
}) {
  const config = useConfig();

  const {
    title: {
      formatter: titleFormatter,
    } = {},
    subtitle: {
      formatter: subtitleFormatter,
    } = {},
    description: {
      formatter: descriptionFormatter,
    } = {},
    tags: {
      formatter: tagFormatter,
    } = {},
    footer: {
      formatter: footerFormatter,
    } = {},
    aside: {
      formatter: asideFormatter,
    } = {},
  } = detailConfig;

  const csid = item.get('csid');
  const objectNumber = item.get('objectNumber');
  const selected = selectedItems ? selectedItems.has(csid) : false;

  const listTypeConfig = config.listTypes[listType];
  const { getItemLocationPath } = listTypeConfig;
  let location;
  let state;
  if (getItemLocationPath) {
    location = getItemLocationPath(item, { config, searchDescriptor });
    state = {
      searchDescriptor: searchDescriptor.toJS(),
      // The search traverser on records will always link to the search result page, so use
      // its search name.
      searchName: SEARCH_RESULT_PAGE_SEARCH_NAME,
    };
  }

  const renderInfo = () => <aside>{asideFormatter(item, { intl })}</aside>;
  const renderDescriptionBlock = () => (
    <div className={styles.description}>
      {
        location ? (
          <Link to={{ pathname: location, state }}>
            {titleFormatter?.(item, { intl })}
          </Link>
        ) : titleFormatter?.(item, { intl })
      }
      {subtitleFormatter?.(item, { intl })}
      {descriptionFormatter?.(item, { intl })}
      {tagFormatter?.(item, { intl })}
      {footerFormatter?.(item, { intl })}
    </div>
  );

  const blob = (
    <SearchResultImage
      derivative={DETAIL_DERIVATIVE}
      item={item}
      location={location}
      state={state}
    />
  );

  const editButton = renderEditButton(location, state, intl, objectNumber);
  return (
    <div className={styles.innerDetail}>
      <div className={styles.imageContainer}>
        {blob}
      </div>
      <SearchResultCheckbox
        index={index}
        listType={listType}
        searchDescriptor={searchDescriptor}
        selected={selected}
      />
      {renderDescriptionBlock()}
      <div className={styles.info}>
        {renderInfo()}
        {editButton}
      </div>
    </div>
  );
}

export default injectIntl(DetailItem);
DetailItem.propTypes = propTypes;
