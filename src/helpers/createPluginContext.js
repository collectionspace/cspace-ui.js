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
import StructuredDateInputContainer from '../containers/input/StructuredDateInputContainer';
import TermPickerInputContainer from '../containers/input/TermPickerInputContainer';
import UploadInputContainer from '../containers/input/UploadInputContainer';
import PermissionsInputContainer from '../containers/admin/PermissionsInputContainer';
import MiniViewPopupAutocompleteInputContainer from '../containers/record/MiniViewPopupAutocompleteInputContainer';

import Panel from '../containers/layout/PanelContainer';
import Field from '../components/record/Field';
import HierarchyInput from '../components/record/HierarchyInput';
import InputTable from '../components/record/InputTable';
import Subrecord from '../components/record/Subrecord';
import ContentViewer from '../components/record/ContentViewer';

import * as dataTypes from '../constants/dataTypes';
import * as searchOperators from '../constants/searchOperators';

import withBooleanValue from '../enhancers/withBooleanValue';

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
const IDGeneratorInput = IDGeneratorInputContainer;
const OptionPickerInput = OptionPickerInputContainer;
const PermissionsInput = labelable(PermissionsInputContainer);
const StructuredDateInput = StructuredDateInputContainer;
const TermPickerInput = TermPickerInputContainer;
const UploadInput = UploadInputContainer;

export default () => ({
  dataTypes,
  formatHelpers,
  searchOperators,
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
    PermissionsInput,
    StructuredDateInput,
    ReadOnlyInput,
    RichTextInput,
    TextInput,
    TermPickerInput,
    UploadInput,
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
