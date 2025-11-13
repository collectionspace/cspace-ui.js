import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import Dock from '../sections/Dock';
import SearchButtonBar from './SearchButtonBar';
import recordTypeStyles from '../../../styles/cspace-ui/SearchFormRecordType.css';
import vocabStyles from '../../../styles/cspace-ui/SearchFormVocab.css';

import {
  getSearchableRecordTypes,
} from '../../helpers/searchHelpers';

import {
  getRecordFieldOptionListName,
  getRecordGroupOptionListName,
} from '../../helpers/configHelpers';
import SearchFormContent from './SearchFormContent';
import SearchFormContentNew from './SearchFormContentNew';

const {
  Label,
  VocabularyInput,
} = inputComponents;

const messages = defineMessages({
  recordType: {
    id: 'searchForm.recordType',
    defaultMessage: 'Find',
  },
  vocabulary: {
    id: 'searchForm.vocabulary',
    defaultMessage: 'in vocabulary',
  },
  keyword: {
    id: 'searchForm.keyword',
    defaultMessage: 'Keywords',
  },
  fullTextSearch: {
    id: 'searchForm.fullTextSearch',
    defaultMessage: 'Full Text Search',
  },
  enterSearchTerms: {
    id: 'searchForm.enterSearchTerms',
    defaultMessage: 'Enter search terms:',
  },
  limitBySpecificFields: {
    id: 'searchForm.limitBySpecificFields',
    defaultMessage: 'Limit by specific fields:',
  },
  and: {
    id: 'searchForm.and',
    defaultMessage: 'And',
  },
});

const propTypes = {
  config: PropTypes.shape({
    messages: PropTypes.object,
  }),
  dockTop: PropTypes.number,
  intl: intlShape,
  keywordValue: PropTypes.string,
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  advancedSearchCondition: PropTypes.instanceOf(Immutable.Map),
  advancedSearchConditionLimitBy: PropTypes.instanceOf(Immutable.Map),
  advancedSearchConditionSearchTerms: PropTypes.instanceOf(Immutable.Map),
  preferredAdvancedSearchBooleanOp: PropTypes.string,
  recordTypeInputReadOnly: PropTypes.bool,
  recordTypeInputRootType: PropTypes.string,
  recordTypeInputRecordTypes: PropTypes.arrayOf(PropTypes.string),
  recordTypeInputServiceTypes: PropTypes.arrayOf(PropTypes.string),
  showButtons: PropTypes.bool,
  perms: PropTypes.instanceOf(Immutable.Map),
  getAuthorityVocabCsid: PropTypes.func,
  buildRecordFieldOptionLists: PropTypes.func,
  deleteOptionList: PropTypes.func,
  showNewSearch: PropTypes.bool,
  onAdvancedSearchConditionCommit: PropTypes.func,
  onAdvancedSearchConditionLimitByCommit: PropTypes.func,
  onAdvancedSearchConditionSearchTermsCommit: PropTypes.func,
  onClearButtonClick: PropTypes.func,
  onKeywordCommit: PropTypes.func,
  onRecordTypeCommit: PropTypes.func,
  onVocabularyCommit: PropTypes.func,
  onSearch: PropTypes.func,
};

export default class SearchForm extends Component {
  constructor() {
    super();

    this.formatRecordTypeLabel = this.formatRecordTypeLabel.bind(this);
    this.formatVocabularyLabel = this.formatVocabularyLabel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleKeywordInputCommit = this.handleKeywordInputCommit.bind(this);
    this.handleRecordTypeDropdownCommit = this.handleRecordTypeDropdownCommit.bind(this);
    this.handleVocabularyDropdownCommit = this.handleVocabularyDropdownCommit.bind(this);
    this.renderVocabularyInput = this.renderVocabularyInput.bind(this);
  }

  componentDidMount() {
    const {
      config,
      recordTypeValue,
      buildRecordFieldOptionLists,
    } = this.props;

    if (buildRecordFieldOptionLists && recordTypeValue) {
      buildRecordFieldOptionLists(config, recordTypeValue);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      config,
      recordTypeValue,
      buildRecordFieldOptionLists,
      deleteOptionList,
    } = this.props;

    const {
      recordTypeValue: prevRecordTypeValue,
    } = prevProps;

    if (recordTypeValue !== prevRecordTypeValue) {
      if (deleteOptionList) {
        deleteOptionList(getRecordFieldOptionListName(prevRecordTypeValue));
        deleteOptionList(getRecordGroupOptionListName(prevRecordTypeValue));
      }

      if (buildRecordFieldOptionLists && recordTypeValue) {
        buildRecordFieldOptionLists(config, recordTypeValue);
      }
    }
  }

  componentWillUnmount() {
    const {
      recordTypeValue,
      deleteOptionList,
    } = this.props;

    if (deleteOptionList) {
      deleteOptionList(getRecordFieldOptionListName(recordTypeValue));
      deleteOptionList(getRecordGroupOptionListName(recordTypeValue));
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const {
      onSearch,
    } = this.props;

    if (onSearch) {
      onSearch();
    }
  }

  handleKeywordInputCommit(path, value) {
    const {
      onKeywordCommit,
    } = this.props;

    if (onKeywordCommit) {
      onKeywordCommit(value);
    }
  }

  handleRecordTypeDropdownCommit(path, value) {
    const {
      onRecordTypeCommit,
    } = this.props;

    if (onRecordTypeCommit) {
      onRecordTypeCommit(value);
    }
  }

  handleVocabularyDropdownCommit(path, value) {
    const {
      onVocabularyCommit,
    } = this.props;

    if (onVocabularyCommit) {
      onVocabularyCommit(value);
    }
  }

  formatRecordTypeLabel(name, config) {
    const {
      intl,
    } = this.props;

    return (intl.formatMessage(config.messages.record.collectionName) || name);
  }

  formatVocabularyLabel(name, config) {
    const {
      intl,
    } = this.props;

    return (intl.formatMessage(config.messages.name) || name);
  }

  renderVocabularyInput(recordTypes) {
    const {
      intl,
      recordTypeValue,
      vocabularyValue,
    } = this.props;

    if (
      !recordTypeValue
      || !recordTypes[recordTypeValue]
      || !recordTypes[recordTypeValue].vocabularies
    ) {
      return null;
    }

    return (
      <div className={vocabStyles.common}>
        <Label>{intl.formatMessage(messages.vocabulary)}</Label>
        <VocabularyInput
          recordTypes={recordTypes}
          recordType={recordTypeValue}
          value={vocabularyValue}
          formatVocabularyLabel={this.formatVocabularyLabel}
          onCommit={this.handleVocabularyDropdownCommit}
        />
      </div>
    );
  }

  render() {
    const {
      advancedSearchCondition,
      advancedSearchConditionLimitBy,
      advancedSearchConditionSearchTerms,
      config,
      dockTop,
      intl,
      keywordValue,
      perms,
      preferredAdvancedSearchBooleanOp,
      recordTypeValue,
      recordTypeInputReadOnly,
      recordTypeInputRootType,
      recordTypeInputRecordTypes,
      recordTypeInputServiceTypes,
      showButtons,
      getAuthorityVocabCsid,
      showNewSearch,
      onAdvancedSearchConditionCommit,
      onAdvancedSearchConditionLimitByCommit,
      onAdvancedSearchConditionSearchTermsCommit,
      onClearButtonClick,
    } = this.props;

    const fullTextPanelHeader = (
      <h3><FormattedMessage {...messages.fullTextSearch} /></h3>
    );

    // If showButtons is false, render the button bar anyway, but with height 0, so that the submit
    // button will exist on the page, invisibly. This allows pressing enter on fields to submit the
    // form.

    const topButtonBar = (
      <SearchButtonBar onClearButtonClick={onClearButtonClick} />
    );

    let header;

    if (showButtons) {
      header = (
        <Dock dockTop={dockTop} isSidebarOpen={false}>{topButtonBar}</Dock>
      );
    } else {
      header = (
        <div style={{ height: '0', overflow: 'hidden', margin: '0' }}>{topButtonBar}</div>
      );
    }

    let footer;

    if (showButtons) {
      footer = (
        <footer>
          <SearchButtonBar onClearButtonClick={onClearButtonClick} />
        </footer>
      );
    }

    const searchableRecordTypes = getSearchableRecordTypes(getAuthorityVocabCsid, config, perms);

    let recordTypes;

    if (recordTypeInputRecordTypes) {
      recordTypes = {};

      // Filter out searchable record types that are not included in the desired record types list.

      recordTypeInputRecordTypes.forEach((recordType) => {
        recordTypes[recordType] = searchableRecordTypes[recordType];
      });
    } else {
      recordTypes = searchableRecordTypes;
    }

    return showNewSearch
      ? (
        <SearchFormContentNew
          header={header}
          footer={footer}
          recordTypes={recordTypes}
          recordTypeInputRootType={recordTypeInputRootType}
          recordTypeInputServiceTypes={recordTypeInputServiceTypes}
          recordTypeValue={recordTypeValue}
          intl={intl}
          messages={messages}
          config={config}
          formatRecordTypeLabel={this.formatRecordTypeLabel}
          handleRecordTypeDropdownCommit={this.handleRecordTypeDropdownCommit}
          renderVocabularyInput={this.renderVocabularyInput}
          keywordValue={keywordValue}
          handleKeywordInputCommit={this.handleKeywordInputCommit}
          advancedSearchConditionSearchTerms={advancedSearchConditionSearchTerms}
          advancedSearchConditionLimitBy={advancedSearchConditionLimitBy}
          onAdvancedSearchConditionSearchTermsCommit={onAdvancedSearchConditionSearchTermsCommit}
          onAdvancedSearchConditionLimitByCommit={onAdvancedSearchConditionLimitByCommit}
          handleFormSubmit={this.handleFormSubmit}
        />
      )
      : (
        <SearchFormContent
          header={header}
          footer={footer}
          recordTypeStyles={recordTypeStyles}
          recordTypes={recordTypes}
          recordTypeInputRootType={recordTypeInputRootType}
          recordTypeInputServiceTypes={recordTypeInputServiceTypes}
          recordTypeValue={recordTypeValue}
          intl={intl}
          messages={messages}
          formatRecordTypeLabel={this.formatRecordTypeLabel}
          handleRecordTypeDropdownCommit={this.handleRecordTypeDropdownCommit}
          renderVocabularyInput={this.renderVocabularyInput}
          fullTextPanelHeader={fullTextPanelHeader}
          keywordValue={keywordValue}
          handleKeywordInputCommit={this.handleKeywordInputCommit}
          advancedSearchCondition={advancedSearchCondition}
          config={config}
          preferredAdvancedSearchBooleanOp={preferredAdvancedSearchBooleanOp}
          onAdvancedSearchConditionCommit={onAdvancedSearchConditionCommit}
          handleFormSubmit={this.handleFormSubmit}
          recordTypeInputReadOnly={recordTypeInputReadOnly}
        />
      );
  }
}

SearchForm.propTypes = propTypes;
