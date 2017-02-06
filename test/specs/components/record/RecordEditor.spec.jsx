/* global window, document */

import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/containers/layout/PanelContainer';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordEditor from '../../../../src/components/record/RecordEditor';

chai.should();

const {
  CompoundInput,
  TextInput,
} = inputComponents;

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.Map(),
  record: {
    data: {},
    readsPending: {},
    savesPending: {},
  },
});

const config = {
  recordTypes: {
    object: {
      forms: {
        default: (
          <CompoundInput>
            <Panel name="id">
              <TextInput name="objectNumber" />
              <TextInput name="desc" msgkey="foo" />
              <TextInput name="color" label="Color" />
              <TextInput name="bar" />
            </Panel>
          </CompoundInput>
        ),
      },
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Object',
          },
        },
        panel: {
          id: {
            id: 'panel.id.label',
            defaultMessage: 'Object Identification Information',
          },
        },
        field: {
          objectNumber: {
            id: 'field.objectNumber.label',
            defaultMessage: 'Identification number',
          },
          foo: {
            id: 'field.foo.label',
            defaultMessage: 'Some label',
          },
        },
      },
      title: () => 'Title',
    },
  },
};

const expectedClassName = 'cspace-ui-RecordEditor--common';

describe('RecordEditor', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a form', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordEditor recordType="object" />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('FORM');
  });


  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordEditor recordType="object" />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should apply labels to the form template by using the name prop as a key into the message descriptor map', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordEditor recordType="object" />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('header > button > h3').textContent.should
      .equal('Object Identification Information');

    this.container.querySelector('section > div > div:nth-of-type(1) > label').textContent.should
      .equal('Identification number');
  });

  it('should use the msgkey prop as a key into the message descriptor map when present', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordEditor recordType="object" />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('section > div > div:nth-of-type(2) > label').textContent.should
      .equal('Some label');
  });

  it('should not override labels that are specified in props', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordEditor recordType="object" />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('section > div > div:nth-of-type(3) > label').textContent.should
      .equal('Color');
  });

  it('should not apply a label when there is no matching message descriptor key', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <ConfigProvider config={config}>
            <RecordEditor recordType="object" />
          </ConfigProvider>
        </StoreProvider>
      </IntlProvider>, this.container);

    // The field with name bar won't have a container div, since there is no label.

    this.container.querySelectorAll('section > div > div').length.should.equal(3);
  });
});
