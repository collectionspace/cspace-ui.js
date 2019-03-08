import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import classNames from 'classnames';
import warning from 'warning';
import { getCsid } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordForm.css';

function renderTemplate(component, messages, handlers) {
  const overrideProps = {};
  const type = get(component, 'type');

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes) {
      Object.keys(handlers).forEach((handlerName) => {
        if (propTypes[handlerName] && !component.props[handlerName]) {
          overrideProps[handlerName] = handlers[handlerName];
        }
      });
    }

    return React.cloneElement(
      component,
      overrideProps,
      React.Children.map(
        component.props.children,
        child => renderTemplate(child, messages, handlers)));
  }

  return component;
}

const propTypes = {
  config: PropTypes.object,
  recordTypeConfig: PropTypes.object,
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
  readOnly: PropTypes.bool,
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
  onSortInstances: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
};

const childContextTypes = {
  config: PropTypes.object,
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  recordTypeConfig: PropTypes.object,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default class RecordForm extends Component {
  getChildContext() {
    const {
      config,
      csid,
      data,
      recordType,
      recordTypeConfig,
      vocabulary,
      readOnly,
    } = this.props;

    // Get the csid from the data. This may differ from the csid in props, for example if a
    // urn-style csid was entered in the address bar. We always want to supply the guid-style csid
    // in the context.

    const dataCsid = getCsid(data);

    return {
      config,
      recordType,
      recordTypeConfig,
      vocabulary,
      readOnly,
      csid: dataCsid || csid,
      recordData: data,
    };
  }

  render() {
    const {
      config,
      data,
      formName,
      readOnly,
      recordType,
      recordTypeConfig,
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
      onSortInstances,
    } = this.props;

    if (!recordTypeConfig) {
      return null;
    }

    const {
      fields,
      forms,
      messages,
    } = recordTypeConfig;

    const handlers = {
      onAddInstance,
      onCommit,
      onSortInstances,
      onMoveInstance,
      onRemoveInstance,
    };

    let formTemplate;

    if (formName) {
      formTemplate = get(forms, [formName, 'template']);
    }

    if (!formTemplate) {
      // Try to get the configured default form.

      const defaultFormName = recordTypeConfig.defaultForm || 'default';

      if (defaultFormName) {
        formTemplate = get(forms, [defaultFormName, 'template']);
      }

      warning(formTemplate, `No form template found for form name ${formName} or default form name ${defaultFormName} in record type ${recordType}. Check the record type plugin configuration.`);
    }

    if (typeof formTemplate === 'function') {
      const result = formTemplate(data, config);

      if (!result) {
        return null;
      }

      if (typeof result === 'string') {
        // The form template function returned a string. This will be the name of another form
        // template to use.

        formTemplate = get(forms, [result, 'template']);

        warning(formTemplate, `No form template found for computed form name ${result} for form name ${formName} in record type ${recordType}. Check the record type plugin configuration.`);
      } else {
        if (isValidElement(result)) {
          // The form template function returned a React element to use.

          formTemplate = result;
        }

        warning(formTemplate, `The computed form template for form name ${formName} in record type ${recordType} did not return a string or a React element. Check the record type plugin configuration.`);
      }
    }

    const rootPropertyName = Object.keys(fields)[0];

    const formContent = React.cloneElement(formTemplate, {
      readOnly,
      name: rootPropertyName,
      value: data.get(rootPropertyName),
      children: React.Children.map(
        formTemplate.props.children,
        child => renderTemplate(child, messages, handlers)),
    });

    const className = classNames(styles.common, `cspace-ui-RecordForm--${recordType}`);

    return (
      <div className={className}>
        {formContent}
      </div>
    );
  }
}

RecordForm.propTypes = propTypes;
RecordForm.defaultProps = defaultProps;
RecordForm.childContextTypes = childContextTypes;
