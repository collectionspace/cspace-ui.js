// File: `src/components/search/SearchFormContent.jsx`

import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'cspace-layout';
import { components as inputComponents } from 'cspace-input';
import AdvancedSearchBuilderContainer from '../../containers/search/AdvancedSearchBuilderContainer';
import { ConnectedPanel } from '../../containers/layout/PanelContainer';
import styles from '../../../styles/cspace-ui/SearchForm.css';
import recordTypeStyles from '../../../styles/cspace-ui/SearchFormRecordType.css';

const { LineInput, RecordTypeInput } = inputComponents;

const SearchFormContent = ({
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
  fullTextPanelHeader,
  keywordValue,
  handleKeywordInputCommit,
  advancedSearchCondition,
  config,
  preferredAdvancedSearchBooleanOp,
  onAdvancedSearchConditionCommit,
  handleFormSubmit,
  recordTypeInputReadOnly,
}) => (
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
          readOnly={recordTypeInputReadOnly}
        />
        {renderVocabularyInput(recordTypes)}
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
          onCommit={handleKeywordInputCommit}
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

SearchFormContent.propTypes = {
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
  fullTextPanelHeader: PropTypes.node.isRequired,
  keywordValue: PropTypes.string,
  handleKeywordInputCommit: PropTypes.func.isRequired,
  advancedSearchCondition: PropTypes.object,
  config: PropTypes.object,
  preferredAdvancedSearchBooleanOp: PropTypes.string,
  onAdvancedSearchConditionCommit: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  recordTypeInputReadOnly: PropTypes.bool,
};

export default SearchFormContent;
