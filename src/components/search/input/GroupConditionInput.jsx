import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import RemoveConditionButton from '../RemoveConditionButton';
import GroupInput from './GroupInput';
import styles from '../../../../styles/cspace-ui/GroupConditionInput.css';
import { OP_AND } from '../../../constants/searchOperators';

import {
  getRecordFieldOptionListName,
  getRecordGroupOptionListName,
} from '../../../helpers/configHelpers';

const propTypes = {
  condition: PropTypes.instanceOf(Immutable.Map),
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  hasChildGroups: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string,
  rootPath: PropTypes.string,
  getSearchConditionInputComponent: PropTypes.func.isRequired,
  buildRecordFieldOptionLists: PropTypes.func,
  deleteOptionList: PropTypes.func,
  isNewSearchForm: PropTypes.bool,
  onCommit: PropTypes.func,
  onRemove: PropTypes.func,
};

const messages = {
  groupInput: defineMessages({
    pendingLabel: {
      id: 'GroupConditionInput.groupInput.pendingLabel',
      defaultMessage: 'In a single {groupInput} ...',
    },
    selectedLabel: {
      id: 'GroupConditionInput.groupInput.selectedLabel',
      defaultMessage: 'In a single {groupInput} group:',
    },
    compactLabel: {
      id: 'GroupConditionInput.groupInput.compactLabel',
      defaultMessage: 'In {groupInput}:',
    },
  }),
};

export default class GroupConditionInput extends Component {
  constructor() {
    super();

    this.handleChildConditionCommit = this.handleChildConditionCommit.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleGroupCommit = this.handleGroupCommit.bind(this);
  }

  componentDidMount() {
    const {
      buildRecordFieldOptionLists,
      condition,
      config,
      recordType,
    } = this.props;

    const path = condition.get('path');

    if (path === null) {
      // The condition was just added, and the group needs to be selected. Focus it.

      if (this.domNode) {
        const input = this.domNode.querySelector('input[data-name="group"]');

        if (input) {
          input.focus();
        }
      }
    } else if (buildRecordFieldOptionLists) {
      buildRecordFieldOptionLists(config, recordType, path, true);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      condition,
      buildRecordFieldOptionLists,
      config,
      recordType,
    } = this.props;

    const {
      condition: prevCondition,
    } = prevProps;

    const path = condition.get('path');
    const prevPath = prevCondition.get('path');

    if (path !== prevPath) {
      // The group changed. Load the field options for the group.

      if (buildRecordFieldOptionLists) {
        buildRecordFieldOptionLists(config, recordType, path, true);
      }
    }
  }

  componentWillUnmount() {
    const {
      deleteOptionList,
      condition,
      recordType,
    } = this.props;

    const path = condition.get('path');

    if (path && deleteOptionList) {
      deleteOptionList(getRecordFieldOptionListName(recordType, path));
      deleteOptionList(getRecordGroupOptionListName(recordType, path));
    }
  }

  handleChildConditionCommit(childName, childCondition) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(name, condition.set('value', childCondition));
    }
  }

  handleGroupCommit(path, groupPath) {
    const {
      condition,
      name,
      onCommit,
    } = this.props;

    if (onCommit) {
      // Reset the current value, since child conditions may not be valid for the new field.

      onCommit(name, condition.set('path', groupPath).set('value', Immutable.fromJS({
        op: OP_AND,
        value: [{ path: null }],
      })));
    }
  }

  handleRef(ref) {
    this.domNode = ref;
  }

  handleRemoveButtonClick() {
    const {
      name,
      onRemove,
    } = this.props;

    if (onRemove) {
      onRemove(name);
    }
  }

  renderRemoveButton() {
    const {
      readOnly,
    } = this.props;

    if (readOnly) {
      return null;
    }

    return (
      <RemoveConditionButton onClick={this.handleRemoveButtonClick} />
    );
  }

  renderGroupInput() {
    const {
      condition,
      config,
      inline,
      recordType,
      rootPath,
    } = this.props;

    const pathSpec = condition.get('path');

    if (!pathSpec) {
      if (inline) {
        return null;
      }

      return (
        <GroupInput
          config={config}
          inline={inline}
          name="group"
          placeholder="group"
          recordType={recordType}
          rootPath={rootPath}
          onCommit={this.handleGroupCommit}
        />
      );
    }

    const path = ['document', ...pathSpec.split('/')];
    const fieldDescriptor = get(config, ['recordTypes', recordType, 'fields', ...path]);

    return (
      <GroupInput
        config={config}
        inline={inline}
        readOnly
        recordType={recordType}
        rootPath={rootPath}
        value={pathSpec}
        valueDescriptor={fieldDescriptor}
        onCommit={this.handleGroupCommit}
      />
    );
  }

  renderHeader() {
    const {
      condition,
      inline,
    } = this.props;

    if (inline) {
      const groupInput = this.renderGroupInput();

      return (
        <FormattedMessage
          {...messages.groupInput.compactLabel}
          tagName="div"
          values={{ groupInput }}
        />
      );
    }

    const groupInput = this.renderGroupInput();

    const labelMessage = condition.get('path') === null
      ? messages.groupInput.pendingLabel
      : messages.groupInput.selectedLabel;

    return (
      <header>
        <FormattedMessage
          {...labelMessage}
          tagName="div"
          values={{ groupInput }}
        />
        {this.renderRemoveButton()}
      </header>
    );
  }

  renderChildConditions() {
    const {
      condition,
      config,
      hasChildGroups,
      inline,
      readOnly,
      recordType,
      isNewSearchForm,
      getSearchConditionInputComponent,
    } = this.props;

    const childCondition = condition.get('value');

    if (!childCondition) {
      return null;
    }

    const path = condition.get('path');
    const SearchConditionInputComponent = getSearchConditionInputComponent(childCondition);

    return (
      <SearchConditionInputComponent
        condition={childCondition}
        config={config}
        hasChildGroups={hasChildGroups}
        inline={inline}
        name="groupConditions"
        readOnly={readOnly}
        recordType={recordType}
        rootPath={path}
        showRemoveButton={false}
        isNewSearchForm={isNewSearchForm}
        getSearchConditionInputComponent={getSearchConditionInputComponent}
        onCommit={this.handleChildConditionCommit}
      />
    );
  }

  render() {
    const {
      inline,
    } = this.props;

    const className = inline ? styles.inline : styles.normal;

    return (
      <div className={className} ref={this.handleRef}>
        {this.renderHeader()}
        {inline ? ' ' : null}
        {this.renderChildConditions()}
      </div>
    );
  }
}

GroupConditionInput.propTypes = propTypes;
