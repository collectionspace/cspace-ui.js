import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';

import {
  helpers as inputHelpers,
  components as inputComponents,
  enhancers as inputEnhancers,
} from 'cspace-input';

import { Col, Cols, Row } from 'cspace-layout';
import { getDisplayName } from 'cspace-refname';

import DateInputContainer from '../containers/input/DateInputContainer';
import DateTimeInputContainer from '../containers/input/DateTimeInputContainer';
import HierarchyInputContainer from '../containers/record/HierarchyInputContainer';
import IDGeneratorInputContainer from '../containers/input/IDGeneratorInputContainer';
import OptionPickerInputContainer from '../containers/record/OptionPickerInputContainer';
import UploadInputContainer from '../containers/input/UploadInputContainer';
import PermissionsInputContainer from '../containers/admin/PermissionsInputContainer';
import MiniViewPopupAutocompleteInputContainer from '../containers/record/MiniViewPopupAutocompleteInputContainer';
import RolesInputContainer from '../containers/admin/RolesInputContainer';
import StructuredDateInputContainer from '../containers/record/StructuredDateInputContainer';
import TermPickerInputContainer from '../containers/record/TermPickerInputContainer';
import WorkflowStateInput from '../components/record/WorkflowStateInput';

import Panel from '../containers/layout/PanelContainer';
import Field from '../components/record/Field';
import InputTable from '../components/record/InputTable';
import Subrecord from '../components/record/Subrecord';
import BaseCheckboxInput from '../components/record/CheckboxInput';
import URLInput from '../components/record/URLInput';
import ContentViewer from '../components/record/ContentViewer';

import * as dataTypes from '../constants/dataTypes';
import * as searchOperators from '../constants/searchOperators';

import withBooleanValue from '../enhancers/withBooleanValue';
import withCsid from '../enhancers/withCsid';

import {
  configKey,
  mergeKey,
  mergeStrategy,
} from '../helpers/configHelpers';

import {
  deepGet,
  getPart,
  getPartPropertyName,
  isNewRecord,
} from '../helpers/recordDataHelpers';

import * as formatHelpers from '../helpers/formatHelpers';

const {
  Button,
  CompoundInput,
  PasswordInput,
  ReadOnlyInput,
  RichTextInput,
  TextInput,
} = inputComponents;

const {
  labelable,
  repeatable,
} = inputEnhancers;

const AutocompleteInput = repeatable(labelable(MiniViewPopupAutocompleteInputContainer));
const CheckboxInput = withBooleanValue(BaseCheckboxInput);
const DateInput = DateInputContainer;
const DateTimeInput = DateTimeInputContainer;
const HierarchyInput = withCsid(HierarchyInputContainer);
const IDGeneratorInput = IDGeneratorInputContainer;
const OptionPickerInput = OptionPickerInputContainer;
const PermissionsInput = labelable(PermissionsInputContainer);
const RolesInput = labelable(RolesInputContainer);
const StructuredDateInput = StructuredDateInputContainer;
const TermPickerInput = TermPickerInputContainer;
const UploadInput = UploadInputContainer;

export default () => ({
  dataTypes,
  formatHelpers,
  searchOperators,
  config: {
    extensions: {
      // Initialize the default extensions. This makes testing easier, since the plugins that
      // implement these extensions won't necessarily be loaded for tests.

      address: {},
      core: {
        advancedSearch: [],
      },
      dimension: {},
      structuredDate: {},
    },
  },
  lib: {
    FormattedMessage,
    Immutable,
    React,
    Component,
    PropTypes,
  },
  inputComponents: {
    AutocompleteInput,
    Button,
    CheckboxInput,
    CompoundInput,
    DateInput,
    DateTimeInput,
    HierarchyInput,
    IDGeneratorInput,
    URLInput,
    OptionPickerInput,
    PasswordInput,
    PermissionsInput,
    RolesInput,
    StructuredDateInput,
    ReadOnlyInput,
    RichTextInput,
    TextInput,
    TermPickerInput,
    UploadInput,
    WorkflowStateInput,
  },
  layoutComponents: {
    Col,
    Cols,
    Panel,
    Row,
  },
  recordComponents: {
    ContentViewer,
    Field,
    InputTable,
    Subrecord,
  },
  configHelpers: {
    configKey,
    mergeKey,
    mergeStrategy,
  },
  pathHelpers: inputHelpers.pathHelpers,
  recordDataHelpers: {
    deepGet,
    getPart,
    getPartPropertyName,
    isNewRecord,
  },
  refNameHelpers: {
    getDisplayName,
  },
});
