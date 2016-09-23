import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Label } from 'cspace-input';

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

function applyMessages(component, messageDescriptors) {
  const overrideProps = {};
  const type = component.type;

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes && propTypes.name && propTypes.label) {
      overrideProps.label = getLabel(component, messageDescriptors);
    }
  }

  return React.cloneElement(
    component,
    overrideProps,
    React.Children.map(
      component.props.children,
      child => applyMessages(child, messageDescriptors)));
}

export default function RecordEditor(props, context) {
  const {
    data,
    service,
  } = props;

  const {
    records,
  } = context;

  const record = records[service];

  const {
    formTemplate,
    messageDescriptors,
  } = record;

  const formContent = React.cloneElement(formTemplate, {
    value: data.document,
    children: React.Children.map(
      formTemplate.props.children,
      child => applyMessages(child, messageDescriptors)),
  });

  return (
    <form>
      {formContent}
    </form>
  );
}

RecordEditor.propTypes = {
  service: PropTypes.string.isRequired,
  data: PropTypes.object,
};

RecordEditor.defaultProps = {
  data: {},
};

RecordEditor.contextTypes = {
  records: React.PropTypes.object.isRequired,
};
