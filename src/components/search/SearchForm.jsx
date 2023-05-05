import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import { Panel } from 'cspace-layout';
import Dock from '../sections/Dock';
import SearchButtonBar from './SearchButtonBar';
import AdvancedSearchBuilderContainer from '../../containers/search/AdvancedSearchBuilderContainer';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';
import styles from '../../../styles/cspace-ui/SearchForm.css';
import recordTypeStyles from '../../../styles/cspace-ui/SearchFormRecordType.css';
import vocabStyles from '../../../styles/cspace-ui/SearchFormVocab.css';

import {
  getSearchableRecordTypes,
} from '../../helpers/searchHelpers';

import {
  getRecordFieldOptionListName,
  getRecordGroupOptionListName,
} from '../../helpers/configHelpers';

const {
  Label,
  LineInput,
  RecordTypeInput,
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
  onAdvancedSearchConditionCommit: PropTypes.func,
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
      onAdvancedSearchConditionCommit,
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

    return (
      <form autoComplete="off" className={styles.common} onSubmit={this.handleFormSubmit}>
        {header}
        <Panel>
          <div className={recordTypeStyles.common}>
            <RecordTypeInput
              label={intl.formatMessage(messages.recordType)}
              recordTypes={recordTypes}
              rootType={recordTypeInputRootType}
              serviceTypes={recordTypeInputServiceTypes}
              value={recordTypeValue}
              formatRecordTypeLabel={this.formatRecordTypeLabel}
              onCommit={this.handleRecordTypeDropdownCommit}
              readOnly={recordTypeInputReadOnly}
            />
            {this.renderVocabularyInput(recordTypes)}
          </div>
          <ConnectedPanel
            collapsible
            header={fullTextPanelHeader}
            name="fullTextSearch"
            recordType={recordTypeValue}
          >
            <LineInput
              label={intl.formatMessage(messages.keyword)}
              value={keywordValue}
              onCommit={this.handleKeywordInputCommit}
            />
          </ConnectedPanel>
          <AdvancedSearchBuilderContainer
            condition={advancedSearchCondition}
            config={config}
            preferredBooleanOp={preferredAdvancedSearchBooleanOp}
            recordType={recordTypeValue}
            onConditionCommit={onAdvancedSearchConditionCommit}
          />
        </Panel>
        {footer}
      </form>
    );
  }
}

SearchForm.propTypes = propTypes;
