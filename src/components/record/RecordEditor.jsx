import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import { Label } from 'cspace-input';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

function getLabel(component, messageDescriptors) {
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
    <Label><FormattedMessage {...messageDescriptor} /></Label>
  );
}

function applyMessages(component, messageDescriptors, handlers) {
  const overrideProps = {};
  const type = component.type;

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes) {
      if (propTypes.name && propTypes.label && !component.props.label) {
        overrideProps.label = getLabel(component, messageDescriptors);
      }

      Object.keys(handlers).forEach((handlerName) => {
        if (propTypes[handlerName]) {
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
      child => applyMessages(child, messageDescriptors, handlers)));
}

export default function RecordEditor(props, context) {
  const {
    data,
    recordType,
    onAddInstance,
    onCommit,
    onMoveInstance,
    onRemoveInstance,
  } = props;

  const {
    recordTypePlugins,
  } = context;

  const recordTypePlugin = recordTypePlugins[recordType];

  const {
    formTemplate,
    messageDescriptors,
  } = recordTypePlugin;

  const handlers = {
    onAddInstance,
    onCommit,
    onMoveInstance,
    onRemoveInstance,
  };

  const formContent = React.cloneElement(formTemplate, {
    name: DOCUMENT_PROPERTY_NAME,
    value: data.get(DOCUMENT_PROPERTY_NAME),
    children: React.Children.map(
      formTemplate.props.children,
      child => applyMessages(child, messageDescriptors, handlers)),
  });

  return (
    <form className={styles.common}>
      {formContent}
    </form>
  );
}

RecordEditor.propTypes = {
  recordType: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Immutable.Map),
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
};

RecordEditor.defaultProps = {
  data: Immutable.Map(),
};

RecordEditor.contextTypes = {
  recordTypePlugins: PropTypes.object,
};
