import React, { Component, PropTypes } from 'react';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { Panel } from 'cspace-layout';
import SearchButtonBar from './SearchButtonBar';
import AdvancedSearchBuilder from './AdvancedSearchBuilder';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';
import styles from '../../../styles/cspace-ui/SearchForm.css';
import recordTypeStyles from '../../../styles/cspace-ui/SearchFormRecordType.css';
import vocabStyles from '../../../styles/cspace-ui/SearchFormVocab.css';

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
  config: PropTypes.object,
  intl: intlShape,
  keywordValue: PropTypes.string,
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  advancedSearchCondition: PropTypes.object,
  recordTypeInputReadOnly: PropTypes.bool,
  showButtons: PropTypes.bool,
  onAdvancedSearchConditionCommit: PropTypes.func,
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

  renderVocabularyInput() {
    const {
      config,
      intl,
      recordTypeValue,
      vocabularyValue,
    } = this.props;

    const {
      recordTypes,
    } = config;

    if (
      !recordTypeValue ||
      !recordTypes[recordTypeValue] ||
      !recordTypes[recordTypeValue].vocabularies
    ) {
      return null;
    }

    return (
      <div className={vocabStyles.common}>
        <Label>{intl.formatMessage(messages.vocabulary)}</Label>
        <VocabularyInput
          recordTypes={config.recordTypes}
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
      intl,
      keywordValue,
      recordTypeValue,
      recordTypeInputReadOnly,
      showButtons,
      onAdvancedSearchConditionCommit,
    } = this.props;

    const fullTextPanelHeader = (
      <h3><FormattedMessage {...messages.fullTextSearch} /></h3>
    );

    // If showButtons is false, render the button bar anyway, but with height 0, so that the submit
    // button will exist on the page, invisibly. This allows pressing enter on fields to submit the
    // form.

    const headerStyle = showButtons
      ? null
      : { height: '0', overflow: 'hidden', margin: '0' };

    const header = <header style={headerStyle}><SearchButtonBar /></header>;

    const footer = showButtons
      ? <footer><SearchButtonBar /></footer>
      : null;

    return (
      <form autoComplete="off" className={styles.common} onSubmit={this.handleFormSubmit}>
        {header}
        <Panel>
          <div className={recordTypeStyles.common}>
            <RecordTypeInput
              label={intl.formatMessage(messages.recordType)}
              recordTypes={config.recordTypes}
              value={recordTypeValue}
              formatRecordTypeLabel={this.formatRecordTypeLabel}
              onCommit={this.handleRecordTypeDropdownCommit}
              readOnly={recordTypeInputReadOnly}
            />
            {this.renderVocabularyInput()}
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
          <AdvancedSearchBuilder
            condition={advancedSearchCondition}
            config={config}
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
