import React, { Component, PropTypes } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { Panel } from 'cspace-layout';
import SearchButtonBar from './SearchButtonBar';
import styles from '../../../styles/cspace-ui/SearchBuilder.css';
import recordTypeStyles from '../../../styles/cspace-ui/SearchBuilderRecordType.css';
import vocabStyles from '../../../styles/cspace-ui/SearchBuilderVocab.css';

const {
  Label,
  LineInput,
  RecordTypeInput,
  VocabularyInput,
} = inputComponents;

const messages = defineMessages({
  recordType: {
    id: 'searchBuilder.recordType',
    defaultMessage: 'Find',
  },
  vocabulary: {
    id: 'searchBuilder.vocabulary',
    defaultMessage: 'in vocabulary',
  },
  keyword: {
    id: 'searchBuilder.keyword',
    defaultMessage: 'Keywords',
  },
});

const propTypes = {
  config: PropTypes.object,
  intl: intlShape,
  keywordValue: PropTypes.string,
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  onKeywordCommit: PropTypes.func,
  onRecordTypeCommit: PropTypes.func,
  onVocabularyCommit: PropTypes.func,
  onSearch: PropTypes.func,
};

export default class SearchBuilder extends Component {
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
      config,
      intl,
      keywordValue,
      recordTypeValue,
    } = this.props;

    return (
      <form className={styles.common} onSubmit={this.handleFormSubmit}>
        <header>
          <SearchButtonBar />
        </header>
        <Panel>
          <div className={recordTypeStyles.common}>
            <RecordTypeInput
              label={intl.formatMessage(messages.recordType)}
              recordTypes={config.recordTypes}
              value={recordTypeValue}
              formatRecordTypeLabel={this.formatRecordTypeLabel}
              onCommit={this.handleRecordTypeDropdownCommit}
            />
            {this.renderVocabularyInput()}
          </div>
          <LineInput
            label={intl.formatMessage(messages.keyword)}
            value={keywordValue}
            onCommit={this.handleKeywordInputCommit}
          />
          {/*
          <CompoundInput label="Advanced Search">
            <CompoundInput repeating />
          </CompoundInput>
          */}
        </Panel>
        <footer>
          <SearchButtonBar />
        </footer>
      </form>
    );
  }
}

SearchBuilder.propTypes = propTypes;

// as=( (persons_common:personTermGroupList/*/termStatus ILIKE "provisional")
// OR (persons_common:personTermGroupList/*/termDisplayName ILIKE "Connie") )

// persons_common:personTermGroupList/*1/termStatus = "provisional" AND
// persons_common:personTermGroupList/*1/termDisplayName = "Coco Collector"


// as=( (persons_common:personTermGroupList/*/termStatus ILIKE "provisional")
// OR (persons_common:personTermGroupList/*/termDisplayName ILIKE "Connie") )

