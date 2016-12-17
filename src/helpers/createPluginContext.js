import React from 'react';
import Immutable from 'immutable';

import {
  components as inputComponents,
} from 'cspace-input';

import {
  getDisplayName,
} from 'cspace-refname';

import IDGeneratorInputContainer from '../containers/input/IDGeneratorInputContainer';
import IntlizedDateInput from '../components/input/IntlizedDateInput';
import AuthorityControlledInputContainer from '../containers/input/AuthorityControlledInputContainer';
import OptionListControlledInputContainer from '../containers/input/OptionListControlledInputContainer';
import StructuredDateInputContainer from '../containers/input/StructuredDateInputContainer';
import VocabularyControlledInputContainer from '../containers/input/VocabularyControlledInputContainer';

import Panel from '../containers/layout/PanelContainer';
import Row from '../components/layout/Row';

import {
  deepGet,
  getPart,
  getPartPropertyName,
} from '../helpers/recordDataHelpers';

const {
  CompoundInput,
  TextInput,
} = inputComponents;

const AuthorityControlledInput = AuthorityControlledInputContainer;
const IDGeneratorInput = IDGeneratorInputContainer;
const DateInput = IntlizedDateInput;
const OptionListControlledInput = OptionListControlledInputContainer;
const StructuredDateInput = StructuredDateInputContainer;
const VocabularyControlledInput = VocabularyControlledInputContainer;

export default () => ({
  lib: {
    Immutable,
    React,
  },
  inputComponents: {
    AuthorityControlledInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    OptionListControlledInput,
    StructuredDateInput,
    TextInput,
    VocabularyControlledInput,
  },
  layoutComponents: {
    Panel,
    Row,
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
