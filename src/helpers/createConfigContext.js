import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import lodash from 'lodash';
import { FormattedMessage } from 'react-intl';
import { helpers as inputHelpers } from 'cspace-input';
import { Col, Cols, Row } from 'cspace-layout';
import { getDisplayName } from 'cspace-refname';

import { findFirst } from '../actions/search';
import Panel from '../containers/layout/PanelContainer';
import Field from '../components/record/Field';
import InputTable from '../components/record/InputTable';
import Subrecord from '../components/record/Subrecord';
import ContentViewer from '../components/record/ContentViewer';

import * as dataTypes from '../constants/dataTypes';
import * as searchOperators from '../constants/searchOperators';

import {
  configKey,
  mergeKey,
  mergeStrategy,
} from './configHelpers';

import {
  deepGet,
  getPart,
  getPartPropertyName,
  isNewRecord,
} from './recordDataHelpers';

import {
  validateNotInUse,
} from './validationHelpers';

import * as formatHelpers from './formatHelpers';
import * as inputComponents from './configContextInputs';

export default () => ({
  dataTypes,
  formatHelpers,
  inputComponents,
  searchOperators,
  actions: {
    findFirst,
  },
  config: {
    extensions: {
      // Initialize the default extensions. This makes testing easier, since the plugins that
      // implement these extensions won't necessarily be loaded for tests.

      address: {},
      authItem: {},
      core: {
        advancedSearch: [],
      },
      dimension: {},
      structuredDate: {},
    },
  },
  lib: {
    lodash,
    FormattedMessage,
    Immutable,
    React,
    Component,
    PropTypes,
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
  validationHelpers: {
    validateNotInUse,
  },
});
