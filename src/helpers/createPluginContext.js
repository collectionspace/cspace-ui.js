import React from 'react';
import Immutable from 'immutable';

import { components as inputComponents } from 'cspace-input';
import { Col, Cols, Row } from 'cspace-layout';
import { getDisplayName } from 'cspace-refname';

import DateInputContainer from '../containers/input/DateInputContainer';
import DateTimeInputContainer from '../containers/input/DateTimeInputContainer';
import IDGeneratorInputContainer from '../containers/input/IDGeneratorInputContainer';
import AutocompleteInputContainer from '../containers/input/AutocompleteInputContainer';
import OptionPickerInputContainer from '../containers/input/OptionPickerInputContainer';
import StructuredDateInputContainer from '../containers/input/StructuredDateInputContainer';
import TermPickerInputContainer from '../containers/input/TermPickerInputContainer';
import UploadInputContainer from '../containers/input/UploadInputContainer';

import Panel from '../containers/layout/PanelContainer';
import Field from '../components/record/Field';
import HierarchyInput from '../components/record/HierarchyInput';
import InputTable from '../components/record/InputTable';
import Subrecord from '../components/record/Subrecord';
import ContentViewer from '../components/record/ContentViewer';

import * as dataTypes from '../constants/dataTypes';

import withBooleanValue from '../enhancers/withBooleanValue';

import {
  configKey,
} from '../helpers/configHelpers';

import {
  deepGet,
  getPart,
  getPartPropertyName,
} from '../helpers/recordDataHelpers';

const {
  CheckboxInput: BaseCheckboxInput,
  CompoundInput,
  ReadOnlyInput,
  TextInput,
} = inputComponents;

const AutocompleteInput = AutocompleteInputContainer;
const CheckboxInput = withBooleanValue(BaseCheckboxInput);
const DateInput = DateInputContainer;
const DateTimeInput = DateTimeInputContainer;
const IDGeneratorInput = IDGeneratorInputContainer;
const OptionPickerInput = OptionPickerInputContainer;
const StructuredDateInput = StructuredDateInputContainer;
const TermPickerInput = TermPickerInputContainer;
const UploadInput = UploadInputContainer;

export default () => ({
  dataTypes,
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
    StructuredDateInput,
    ReadOnlyInput,
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
  },
  recordDataHelpers: {
    deepGet,
    getPart,
    getPartPropertyName,
  },
  refNameHelpers: {
    getDisplayName,
  },
});
