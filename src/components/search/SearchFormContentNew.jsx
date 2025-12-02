import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'cspace-layout';
import { components as inputComponents } from 'cspace-input';
import { useDispatch, useSelector } from 'react-redux';
import AdvancedSearchBuilderContainer from '../../containers/search/AdvancedSearchBuilderContainer';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';
import styles from '../../../styles/cspace-ui/SearchForm.css';
import recordTypeStyles from '../../../styles/cspace-ui/SearchFormRecordType.css';
import { showNotification } from '../../actions/notification';
import { STATUS_SUCCESS } from '../../constants/notificationStatusCodes';
import { setNewSearchShown } from '../../actions/prefs';
import { getNewSearchShown } from '../../reducers';
import {
  SEARCH_TERMS_GROUP_LIMIT_BY,
  SEARCH_TERMS_GROUP_SEARCH_TERMS,
} from '../../constants/searchNames';

const { LineInput, RecordTypeInput } = inputComponents;

const SearchFormContentNew = ({
  header,
  footer,
  recordTypes,
  recordTypeInputRootType,
  recordTypeInputServiceTypes,
  recordTypeValue,
  intl,
  messages,
  formatRecordTypeLabel,
  handleRecordTypeDropdownCommit,
  renderVocabularyInput,
  keywordValue,
  handleKeywordInputCommit,
  advancedSearchConditionSearchTerms,
  advancedSearchConditionLimitBy,
  onAdvancedSearchConditionSearchTermsCommit,
  onAdvancedSearchConditionLimitByCommit,
  handleFormSubmit,
  config,
}) => {
  const dispatch = useDispatch();
  const reduxNewSearchShown = useSelector((state) => getNewSearchShown(state));
  const [newSearchShown] = useState(reduxNewSearchShown);

  useEffect(() => {
    if (!newSearchShown) {
      // TODO: message needs to be specified
      dispatch(showNotification({
        items: [{
          message: {
            id: 'newSearchForm.informative',
            defaultMessage: 'Welcome to the new CollectionSpace Advanced Search. Classic Search will remain available in the 8.3 release to ease the transition to the new advanced search. Please share feedback with us and visit the User Manual for more information on the functionality of search.',
          },
        }],
        date: new Date(),
        status: STATUS_SUCCESS,
      }));
      dispatch(setNewSearchShown());
    }
  }, []);

  return (
    <form autoComplete="off" className={styles.common} onSubmit={handleFormSubmit}>
      {header}
      <Panel>
        <div className={recordTypeStyles.common}>
          <RecordTypeInput
            label={intl.formatMessage(messages.recordType)}
            recordTypes={recordTypes}
            rootType={recordTypeInputRootType}
            serviceTypes={recordTypeInputServiceTypes}
            value={recordTypeValue}
            formatRecordTypeLabel={formatRecordTypeLabel}
            onCommit={handleRecordTypeDropdownCommit}
          />
          {renderVocabularyInput(recordTypes)}
        </div>
        <ConnectedPanel
          collapsible
          name="searchTermsPanel"
          header={<h3>{intl.formatMessage(messages.enterSearchTerms)}</h3>}
        >
          <LineInput
            label={intl.formatMessage(messages.keyword)}
            value={keywordValue}
            onCommit={handleKeywordInputCommit}
          />
          <div className={styles.mb12}><b>{intl.formatMessage(messages.and)}</b></div>
          <AdvancedSearchBuilderContainer
            condition={advancedSearchConditionSearchTerms}
            config={config}
            hasChildGroups
            name="advancedSearch"
            recordType={recordTypeValue}
            showInlineParens={false}
            showRemoveButton={false}
            onConditionCommit={onAdvancedSearchConditionSearchTermsCommit}
            searchTermsGroup={SEARCH_TERMS_GROUP_SEARCH_TERMS}
            withoutPanel
          />
        </ConnectedPanel>
        <div className={styles.mb12}><b>{intl.formatMessage(messages.and)}</b></div>
        <ConnectedPanel
          collapsible
          name="limitByPanel"
          header={<h3>{intl.formatMessage(messages.limitBySpecificFields)}</h3>}
        >
          <AdvancedSearchBuilderContainer
            condition={advancedSearchConditionLimitBy}
            config={config}
            hasChildGroups
            name="advancedSearch"
            recordType={recordTypeValue}
            showInlineParens={false}
            showRemoveButton={false}
            onConditionCommit={onAdvancedSearchConditionLimitByCommit}
            searchTermsGroup={SEARCH_TERMS_GROUP_LIMIT_BY}
            withoutPanel
          />
        </ConnectedPanel>
      </Panel>
      {footer}
    </form>
  );
};

SearchFormContentNew.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  recordTypes: PropTypes.object,
  recordTypeInputRootType: PropTypes.string,
  recordTypeInputServiceTypes: PropTypes.array,
  recordTypeValue: PropTypes.string,
  intl: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  formatRecordTypeLabel: PropTypes.func.isRequired,
  handleRecordTypeDropdownCommit: PropTypes.func.isRequired,
  renderVocabularyInput: PropTypes.func.isRequired,
  keywordValue: PropTypes.string,
  handleKeywordInputCommit: PropTypes.func.isRequired,
  advancedSearchConditionSearchTerms: PropTypes.object,
  advancedSearchConditionLimitBy: PropTypes.object,
  onAdvancedSearchConditionSearchTermsCommit: PropTypes.func.isRequired,
  onAdvancedSearchConditionLimitByCommit: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  config: PropTypes.object,
};

export default SearchFormContentNew;
