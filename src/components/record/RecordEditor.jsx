import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

const { Label } = inputComponents;

function getMessage(Wrapper, component, messageDescriptors) {
  const {
    msgkey,
    name,
  } = component.props;

  const key = msgkey || name;
  const messageDescriptor = messageDescriptors[key];

  if (!messageDescriptor) {
    return null;
  }

  return (
    <Wrapper>
      <FormattedMessage {...messageDescriptor} />
    </Wrapper>
  );
}

function renderTemplate(component, messageDescriptors, handlers) {
  const overrideProps = {};
  const type = component.type;

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes) {
      if (propTypes.name) {
        if (propTypes.label && !component.props.label) {
          overrideProps.label = getMessage(Label, component, messageDescriptors);
        }

        if (propTypes.header && !component.props.header) {
          overrideProps.header = getMessage('h3', component, messageDescriptors);
        }
      }

      Object.keys(handlers).forEach((handlerName) => {
        if (propTypes[handlerName] && !component.props[handlerName]) {
          overrideProps[handlerName] = handlers[handlerName];
        }
      });
    }
  }

  return React.cloneElement(
    component,
    overrideProps,
    React.Children.map(
      component.props.children,
      child => renderTemplate(child, messageDescriptors, handlers)));
}

const propTypes = {
  recordType: PropTypes.string.isRequired,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
};

const childContextTypes = {
  recordType: PropTypes.string,
  csid: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
};

export default class RecordEditor extends Component {
  getChildContext() {
    const {
      csid,
      recordType,
    } = this.props;

    return {
      csid,
      recordType,
    };
  }

  render() {
    const {
      data,
      recordType,
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    } = this.props;

    const {
      config,
    } = this.context;

    const recordTypeConfig = config.recordTypes[recordType];

    const {
      forms,
      messageDescriptors,
    } = recordTypeConfig;

    const handlers = {
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    };

    const formTemplate = forms.default;

    const formContent = React.cloneElement(formTemplate, {
      name: DOCUMENT_PROPERTY_NAME,
      value: data.get(DOCUMENT_PROPERTY_NAME),
      children: React.Children.map(
        formTemplate.props.children,
        child => renderTemplate(child, messageDescriptors, handlers)),
    });

    return (
      <form
        autoComplete="off"
        className={styles.common}
      >
        {formContent}
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;
RecordEditor.childContextTypes = childContextTypes;
RecordEditor.contextTypes = contextTypes;
