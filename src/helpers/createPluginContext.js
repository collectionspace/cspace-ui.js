import React from 'react';
import Immutable from 'immutable';

import {
  components as inputComponents,
  enhancers as inputEnhancers,
} from 'cspace-input';

import BaseAuthorityControlledInput from '../containers/input/AuthorityControlledInputContainer';
import BaseOptionControlledInput from '../containers/input/OptionControlledInputContainer';
import BaseVocabularyControlledInput from '../containers/input/VocabularyControlledInputContainer';

import Panel from '../containers/layout/PanelContainer';
import Row from '../components/layout/Row';

import {
  deepGet,
  getPart,
  getPartPropertyName,
} from '../helpers/recordDataHelpers';

import {
  getDisplayName,
} from '../helpers/refNameHelpers';

const {
  labelable,
  repeatable,
} = inputEnhancers;

const {
  CompoundInput,
  DateInput,
  IDGeneratorInput,
  StructuredDateInput,
  TextInput,
} = inputComponents;

const AuthorityControlledInput = repeatable(labelable(BaseAuthorityControlledInput));
const OptionControlledInput = repeatable(labelable(BaseOptionControlledInput));
const VocabularyControlledInput = repeatable(labelable(BaseVocabularyControlledInput));

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
    OptionControlledInput,
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
