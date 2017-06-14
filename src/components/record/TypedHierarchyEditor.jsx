import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import AutocompleteInputContainer from '../../containers/input/AutocompleteInputContainer';
import OptionPickerInputContainer from '../../containers/input/OptionPickerInputContainer';

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
  parentTypeOptionListName: PropTypes.string,
  childTypeOptionListName: PropTypes.string,
  onCommit: PropTypes.func,
  onAddChild: PropTypes.func,
  onRemoveChild: PropTypes.func,
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

  render() {
    const {
      intl,
      messages,
      recordType,
      vocabulary,
      value,
      parentTypeOptionListName,
      childTypeOptionListName,
    } = this.props;

    const source = [recordType, vocabulary].join('/');
    const parentRefName = value.getIn(['parent', 'refName']);
    const parentType = value.getIn(['parent', 'type']);

    const children = value.get('children');

    return (
      <div>
        <InputTable>
          <AutocompleteInputContainer
            label={intl.formatMessage(messages.parent)}
            name="parentRefName"
            source={source}
            value={parentRefName}
            onCommit={this.handleParentRefNameCommit}
            matchFilter={this.filterMatch}
          />
          <OptionPickerInputContainer
            label={intl.formatMessage(messages.parentType)}
            name="parentType"
            source={parentTypeOptionListName}
            value={parentType}
            onCommit={this.handleParentTypeCommit}
          />
        </InputTable>
        <CompoundInput
          label={intl.formatMessage(messages.children)}
          value={children}
        >
          <CompoundInput
            tabular
            repeating
            reorderable={false}
            onAddInstance={this.handleAddChild}
            onRemoveInstance={this.handleRemoveChild}
          >
            <AutocompleteInputContainer
              label={intl.formatMessage(messages.child)}
              name="refName"
              source={source}
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
      </div>
    );
  }
}

BaseTypedHierarchyEditor.propTypes = propTypes;

export default injectIntl(BaseTypedHierarchyEditor);
