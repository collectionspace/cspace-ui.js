import React from 'react';
import Immutable from 'immutable';
import { defineMessages } from 'react-intl';

import { components as inputComponents, enhancers as inputEnhancers } from 'cspace-input';
import { Col, Cols, Row } from 'cspace-layout';
import { getDisplayName } from 'cspace-refname';

import DateInputContainer from '../containers/input/DateInputContainer';
import DateTimeInputContainer from '../containers/input/DateTimeInputContainer';
import IDGeneratorInputContainer from '../containers/input/IDGeneratorInputContainer';
import OptionPickerInputContainer from '../containers/input/OptionPickerInputContainer';
import UploadInputContainer from '../containers/input/UploadInputContainer';
import PermissionsInputContainer from '../containers/admin/PermissionsInputContainer';
import MiniViewPopupAutocompleteInputContainer from '../containers/record/MiniViewPopupAutocompleteInputContainer';
import RolesInputContainer from '../containers/admin/RolesInputContainer';
import StructuredDateInputContainer from '../containers/record/StructuredDateInputContainer';
import TermPickerInputContainer from '../containers/record/TermPickerInputContainer';
import WorkflowStateInput from '../components/record/WorkflowStateInput';

import Panel from '../containers/layout/PanelContainer';
import Field from '../components/record/Field';
import BaseHierarchyInput from '../components/record/HierarchyInput';
import InputTable from '../components/record/InputTable';
import Subrecord from '../components/record/Subrecord';
import ContentViewer from '../components/record/ContentViewer';

import * as dataTypes from '../constants/dataTypes';
import * as searchOperators from '../constants/searchOperators';

import withBooleanValue from '../enhancers/withBooleanValue';
import withCsid from '../enhancers/withCsid';

import {
  configKey,
} from '../helpers/configHelpers';

import {
  deepGet,
  getPart,
  getPartPropertyName,
  isNewRecord,
} from '../helpers/recordDataHelpers';

import * as formatHelpers from '../helpers/formatHelpers';

const {
  CheckboxInput: BaseCheckboxInput,
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
const HierarchyInput = withCsid(BaseHierarchyInput);
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

      core: {
        advancedSearch: [],
      },
      dimension: {},
      structuredDate: {},
    },
  },
  lib: {
    Immutable,
    React,
  },
  inputComponents: {
    AutocompleteInput,
    CheckboxInput,
    CompoundInput,
    DateInput,
    DateTimeInput,
    HierarchyInput,
    IDGeneratorInput,
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
    defineMessages,
  },
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
