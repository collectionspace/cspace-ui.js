import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import AuthorityControlledInputContainer from '../../containers/input/AuthorityControlledInputContainer';

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
  onCommit: PropTypes.func,
  onAddChild: PropTypes.func,
  onRemoveChild: PropTypes.func,
};

export class BaseAuthorityHierarchyEditor extends Component {
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
    } = this.props;

    const authority = [recordType, vocabulary].join('/');
    const parentRefName = value.getIn(['parent', 'refName']);

    const childRefNames =
      value.get('children').map(child => child.get('refName'));

    return (
      <div>
        <AuthorityControlledInputContainer
          authority={authority}
          label={intl.formatMessage(messages.parent)}
          value={parentRefName}
          onCommit={this.handleParentCommit}
          matchFilter={this.filterMatch}
        />
        <CompoundInput
          label={intl.formatMessage(messages.children)}
          value={{ childRefNames }}
        >
          <AuthorityControlledInputContainer
            authority={authority}
            name="childRefNames"
            repeating
            reorderable={false}
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

BaseAuthorityHierarchyEditor.propTypes = propTypes;

export default injectIntl(BaseAuthorityHierarchyEditor);
