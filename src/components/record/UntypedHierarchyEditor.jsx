import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import AutocompleteInputContainer from '../../containers/input/AutocompleteInputContainer';

const {
  CompoundInput,
} = inputComponents;

const propTypes = {
  csid: PropTypes.string,
  intl: intlShape,
  messages: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  value: PropTypes.instanceOf(Immutable.Map),
  readOnly: PropTypes.bool,
  onCommit: PropTypes.func,
  onAddChild: PropTypes.func,
  onRemoveChild: PropTypes.func,
};

export class BaseUntypedHierarchyEditor extends Component {
  constructor() {
    super();

    this.filterMatch = this.filterMatch.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleRemoveChild = this.handleRemoveChild.bind(this);
    this.handleChildCommit = this.handleChildCommit.bind(this);
    this.handleParentCommit = this.handleParentCommit.bind(this);
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

  handleChildCommit(path, value) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      const index = path[path.length - 1];

      onCommit(['children', index, 'refName'], value);
    }
  }

  handleParentCommit(path, value, csid) {
    const {
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(['parent'], Immutable.Map({
        csid,
        refName: value,
      }));
    }
  }

  render() {
    const {
      intl,
      messages,
      recordType,
      vocabulary,
      value,
      readOnly,
    } = this.props;

    const source = [recordType, vocabulary].join('/');
    const parentRefName = value.getIn(['parent', 'refName']);

    const childRefNames =
      value.get('children').map(child => child.get('refName'));

    return (
      <div>
        <AutocompleteInputContainer
          label={intl.formatMessage(messages.parent)}
          source={source}
          value={parentRefName}
          readOnly={readOnly}
          onCommit={this.handleParentCommit}
          matchFilter={this.filterMatch}
        />
        <CompoundInput
          label={intl.formatMessage(messages.children)}
          value={{ childRefNames }}
          readOnly={readOnly}
        >
          <AutocompleteInputContainer
            name="childRefNames"
            repeating
            reorderable={false}
            source={source}
            matchFilter={this.filterMatch}
            onCommit={this.handleChildCommit}
            onAddInstance={this.handleAddChild}
            onRemoveInstance={this.handleRemoveChild}
          />
        </CompoundInput>
      </div>
    );
  }
}

BaseUntypedHierarchyEditor.propTypes = propTypes;

export default injectIntl(BaseUntypedHierarchyEditor);
