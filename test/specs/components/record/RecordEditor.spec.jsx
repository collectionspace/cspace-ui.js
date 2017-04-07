/* global window, document */

import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/containers/layout/PanelContainer';
import RecordEditor from '../../../../src/components/record/RecordEditor';

const expect = chai.expect;

chai.should();

const {
  CompoundInput,
  TextInput,
} = inputComponents;

const mockStore = configureMockStore();

const store = mockStore({
  prefs: Immutable.Map(),
  record: Immutable.Map(),
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
          <RecordEditor config={config} recordType="object" />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('FORM');
  });


  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor config={config} recordType="object" />
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render nothing for an unknown record type', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor config={config} recordType="foo" />
        </StoreProvider>
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should call readRecord when mounted if a csid is provided', function test() {
    let readRecordCalled = false;

    const readRecord = () => {
      readRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="object"
            readRecord={readRecord}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    readRecordCalled.should.equal(true);
  });

  it('should call createNewRecord when mounted if a csid is not provided', function test() {
    let createNewRecordCalled = false;

    const createNewRecord = () => {
      createNewRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            recordType="object"
            createNewRecord={createNewRecord}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    createNewRecordCalled.should.equal(true);
  });

  it('should call readRecord when the csid is changed', function test() {
    let readRecordCalled = false;

    const readRecord = () => {
      readRecordCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="object"
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="5678"
            recordType="object"
            readRecord={readRecord}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    readRecordCalled.should.equal(true);
  });

  it('should call save when the save button is clicked', function test() {
    const handleRecordCreated = () => null;

    let saveCallback = null;

    const save = (callbackArg) => {
      saveCallback = callbackArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            recordType="object"
            save={save}
            onRecordCreated={handleRecordCreated}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    saveCallback.should.equal(handleRecordCreated);
  });

  it('should call revert when the revert button is clicked', function test() {
    let revertCalled = false;

    const revert = () => {
      revertCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            isModified
            recordType="object"
            revert={revert}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const revertButton = this.container.querySelector('button[name=revert]');

    Simulate.click(revertButton);

    revertCalled.should.equal(true);
  });

  it('should call clone when the clone button is clicked', function test() {
    let cloneCalled = false;

    const clone = () => {
      cloneCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="object"
            clone={clone}
          />
        </StoreProvider>
      </IntlProvider>, this.container);

    const cloneButton = this.container.querySelector('button[name=clone]');

    Simulate.click(cloneButton);

    cloneCalled.should.equal(true);
  });
});
