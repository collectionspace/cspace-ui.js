import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import MiniViewPopupAutocompleteInputContainer from '../../containers/record/MiniViewPopupAutocompleteInputContainer';
import OptionPickerInputContainer from '../../containers/record/OptionPickerInputContainer';

const {
  CompoundInput,
  InputTable,
} = inputComponents;

const propTypes = {
  csid: PropTypes.string,
  intl: intlShape,
  messages: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  value: PropTypes.instanceOf(Immutable.Map),
  readOnly: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  showParent: PropTypes.bool,
  showChildren: PropTypes.bool,
  parentTypeOptionListName: PropTypes.string,
  childTypeOptionListName: PropTypes.string,
  onCommit: PropTypes.func,
  onAddChild: PropTypes.func,
  onRemoveChild: PropTypes.func,
};

const defaultProps = {
  showParent: true,
  showChildren: true,
};

export class BaseTypedHierarchyEditor extends Component {
  constructor() {
    super();

    this.filterMatch = this.filterMatch.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleRemoveChild = this.handleRemoveChild.bind(this);
    this.handleChildRefNameCommit = this.handleChildRefNameCommit.bind(this);
    this.handleChildTypeCommit = this.handleChildTypeCommit.bind(this);
    this.handleParentRefNameCommit = this.handleParentRefNameCommit.bind(this);
    this.handleParentTypeCommit = this.handleParentTypeCommit.bind(this);
  }

  filterMatch(item) {
    return (item.csid !== this.props.csid);
  }

  handleAddChild() {
    const {
      onAddChild,
    } = this.props;

    if (onAddChild) {
      onAddChild();
    }
  }

  handleRemoveChild(path) {
    const {
      onRemoveChild,
    } = this.props;

    if (onRemoveChild) {
      const position = parseInt(path[path.length - 1], 10);

      onRemoveChild(position);
    }
  }

  handleChildRefNameCommit(path, value) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const index = path[0];

      onCommit(['children', index, 'refName'], value);
    }
  }

  handleChildTypeCommit(path, value) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const index = path[0];

      onCommit(['children', index, 'type'], value);
    }
  }

  handleParentRefNameCommit(path, value, csid) {
    const {
      value: hierarchy,
      onCommit,
    } = this.props;

    const parent = hierarchy.get('parent');

    if (onCommit) {
      onCommit(['parent'], parent.set('refName', value).set('csid', csid));
    }
  }

  handleParentTypeCommit(path, value) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(['parent', 'type'], value);
    }
  }

  renderParent() {
    const {
      intl,
      messages,
      recordType,
      vocabulary,
      value,
      readOnly,
      isRecordModified,
      showParent,
      parentTypeOptionListName,
    } = this.props;

    if (!showParent) {
      return undefined;
    }

    const source = [recordType, vocabulary].join('/');
    const parentRefName = value.getIn(['parent', 'refName']);
    const parentType = value.getIn(['parent', 'type']);

    return (
      <InputTable label={intl.formatMessage(messages.parent)}>
        <MiniViewPopupAutocompleteInputContainer
          label={intl.formatMessage(messages.parentName)}
          name="parentRefName"
          source={source}
          value={parentRefName}
          readOnly={readOnly}
          showQuickAddCloneOption
          quickAddCloneOptionDisabled={isRecordModified}
          onCommit={this.handleParentRefNameCommit}
          matchFilter={this.filterMatch}
        />
        <OptionPickerInputContainer
          label={intl.formatMessage(messages.parentType)}
          name="parentType"
          source={parentTypeOptionListName}
          value={parentType}
          readOnly={readOnly}
          onCommit={this.handleParentTypeCommit}
        />
      </InputTable>
    );
  }

  renderChildren() {
    const {
      intl,
      messages,
      recordType,
      vocabulary,
      value,
      readOnly,
      isRecordModified,
      showChildren,
      childTypeOptionListName,
    } = this.props;

    if (!showChildren) {
      return undefined;
    }

    const source = [recordType, vocabulary].join('/');
    const children = value.get('children');

    return (
      <CompoundInput
        label={intl.formatMessage(messages.children)}
        value={children}
        readOnly={readOnly}
      >
        <CompoundInput
          tabular
          repeating
          reorderable={false}
          onAddInstance={this.handleAddChild}
          onRemoveInstance={this.handleRemoveChild}
        >
          <MiniViewPopupAutocompleteInputContainer
            label={intl.formatMessage(messages.childName)}
            name="refName"
            source={source}
            showQuickAddCloneOption
            quickAddCloneOptionDisabled={isRecordModified}
            matchFilter={this.filterMatch}
            onCommit={this.handleChildRefNameCommit}
          />
          <OptionPickerInputContainer
            label={intl.formatMessage(messages.childType)}
            name="type"
            source={childTypeOptionListName}
            onCommit={this.handleChildTypeCommit}
          />
        </CompoundInput>
      </CompoundInput>
    );
  }

  render() {
    return (
      <div>
        {this.renderParent()}
        {this.renderChildren()}
      </div>
    );
  }
}

BaseTypedHierarchyEditor.propTypes = propTypes;
BaseTypedHierarchyEditor.defaultProps = defaultProps;

export default injectIntl(BaseTypedHierarchyEditor);
