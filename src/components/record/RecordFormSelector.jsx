import React, { PropTypes } from 'react';
import get from 'lodash/get';
import { injectIntl, intlShape } from 'react-intl';
import { baseComponents as components } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RecordFormSelector.css';

const { DropdownMenuInput } = components;

const formOptions = (forms, intl) =>
  Object.keys(forms)
    .sort((nameA, nameB) => {
      const configA = forms[nameA];
      const configB = forms[nameB];

      // Primary sort by sortOrder

      let sortOrderA = configA.sortOrder;
      let sortOrderB = configB.sortOrder;

      if (typeof sortOrderA !== 'number') {
        sortOrderA = Number.MAX_VALUE;
      }

      if (typeof sortOrderB !== 'number') {
        sortOrderB = Number.MAX_VALUE;
      }

      if (sortOrderA !== sortOrderB) {
        return (sortOrderA > sortOrderB ? 1 : -1);
      }

      // Secondary sort by label

      const labelA = intl.formatMessage(configA.messages.name);
      const labelB = intl.formatMessage(configB.messages.name);

      // FIXME: This should be locale aware
      return labelA.localeCompare(labelB);
    })
    .map(formName => ({
      label: intl.formatMessage(forms[formName].messages.name),
      value: formName,
    }));

const propTypes = {
  config: PropTypes.object,
  intl: intlShape,
  formName: PropTypes.string,
  recordType: PropTypes.string,
  onCommit: PropTypes.func,
};

function RecordFormSelector(props) {
  const {
    config,
    intl,
    formName,
    recordType,
    onCommit,
  } = props;

  const forms = get(config, ['recordTypes', recordType, 'forms']);

  if (!forms || Object.keys(forms).length < 2) {
    return null;
  }

  return (
    <div className={styles.common}>
      <DropdownMenuInput
        options={formOptions(forms, intl)}
        value={formName}
        onCommit={onCommit}
      />
    </div>
  );
}

RecordFormSelector.propTypes = propTypes;

export default injectIntl(RecordFormSelector);
