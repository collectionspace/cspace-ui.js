/* global window, document */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/containers/layout/PanelContainer';
import RecordEditor from '../../../../src/components/record/RecordEditor';
import ConfirmRecordNavigationModal from '../../../../src/components/record/ConfirmRecordNavigationModal';
import ConfirmRecordDeleteModal from '../../../../src/components/record/ConfirmRecordDeleteModal';
import LockRecordModal from '../../../../src/components/record/LockRecordModal';

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
    collectionobject: {
      defaultForm: 'complete',
      forms: {
        complete: {
          messages: {
            name: {
              id: 'form.collectionobject.complete.name',
              defaultMessage: 'Complete Template',
            },
          },
          template: (
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
        inventory: {
          messages: {
            name: {
              id: 'form.collectionobject.inventory.name',
              defaultMessage: 'Inventory Template',
            },
          },
          template: <div />,
        },
        photo: {
          messages: {
            name: {
              id: 'form.collectionobject.photo.name',
              defaultMessage: 'Photo Template',
            },
          },
          template: <div />,
        },
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
    movement: {
      defaultForm: 'complete',
      forms: {
        complete: {
          messages: {
            name: {
              id: 'form.collectionobject.complete.name',
              defaultMessage: 'Complete Template',
            },
          },
          template: <div />,
        },
      },
      lockOnSave: 'prompt',
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Movement',
          },
        },
      },
      title: () => 'Title',
    },
    loanin: {
      defaultForm: 'complete',
      forms: {
        complete: {
          messages: {
            name: {
              id: 'form.collectionobject.complete.name',
              defaultMessage: 'Complete Template',
            },
          },
          template: <div />,
        },
      },
      lockOnSave: true,
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Loan In',
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
          <Router>
            <RecordEditor config={config} recordType="collectionobject" />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('FORM');
  });


  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor config={config} recordType="collectionobject" />
          </Router>
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
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
              readRecord={readRecord}
            />
          </Router>
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
          <Router>
            <RecordEditor
              config={config}
              recordType="collectionobject"
              createNewRecord={createNewRecord}
            />
          </Router>
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
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="5678"
              recordType="collectionobject"
              readRecord={readRecord}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    readRecordCalled.should.equal(true);
  });

  it('should call removeValidationNotification when unmounted', function test() {
    let removeValidationNotificationCalled = false;

    const removeValidationNotification = () => {
      removeValidationNotificationCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
              removeValidationNotification={removeValidationNotification}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    unmountComponentAtNode(this.container);

    removeValidationNotificationCalled.should.equal(true);
  });

  it('should call removeValidationNotification when the csid is changed', function test() {
    let removeValidationNotificationCalled = false;

    const removeValidationNotification = () => {
      removeValidationNotificationCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="5678"
              recordType="collectionobject"
              removeValidationNotification={removeValidationNotification}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    removeValidationNotificationCalled.should.equal(true);
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
          <Router>
            <RecordEditor
              config={config}
              recordType="collectionobject"
              save={save}
              onRecordCreated={handleRecordCreated}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    saveCallback.should.equal(handleRecordCreated);
  });

  it('should call saveWithTransition when the save button is clicked if lockOnSave is true for the record type', function test() {
    const handleRecordCreated = () => null;

    let saveWithTransitionName = null;
    let saveWithTransitionCallback = null;

    const saveWithTransition = (transitionNameArg, callbackArg) => {
      saveWithTransitionName = transitionNameArg;
      saveWithTransitionCallback = callbackArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              recordType="loanin"
              saveWithTransition={saveWithTransition}
              onRecordCreated={handleRecordCreated}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    saveWithTransitionName.should.equal('lock');
    saveWithTransitionCallback.should.equal(handleRecordCreated);
  });

  it('should call revert when the revert button is clicked', function test() {
    let revertCalled = false;

    const revert = () => {
      revertCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              isModified
              recordType="collectionobject"
              revert={revert}
            />
          </Router>
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
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
              clone={clone}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const cloneButton = this.container.querySelector('button[name=clone]');

    Simulate.click(cloneButton);

    cloneCalled.should.equal(true);
  });

  it('should call openModal when the delete button is clicked', function test() {
    let openModalName = null;

    const openModal = (modalNameArg) => {
      openModalName = modalNameArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
              openModal={openModal}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const deleteButton = this.container.querySelector('button[name=delete]');

    Simulate.click(deleteButton);

    openModalName.should.equal(ConfirmRecordDeleteModal.modalName);
  });

  it('should call openModal when the save button is clicked on a locking record', function test() {
    let openModalName = null;

    const openModal = (modalNameArg) => {
      openModalName = modalNameArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="movement"
              openModal={openModal}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    openModalName.should.equal(LockRecordModal.modalName);
  });

  it('should call validateRecordData when the save button error badge is clicked', function test() {
    let validateCalled = false;

    const validateRecordData = () => {
      validateCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
              validateRecordData={validateRecordData}
              validationErrors={Immutable.Map()}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const errorBadge = this.container.querySelector('button.cspace-ui-Badge--common');

    Simulate.click(errorBadge);

    validateCalled.should.equal(true);
  });

  it('should call validateRecordData when the save button error badge is clicked', function test() {
    let validateCalled = false;

    const validateRecordData = () => {
      validateCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
              validateRecordData={validateRecordData}
              validationErrors={Immutable.Map()}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const errorBadge = this.container.querySelector('button.cspace-ui-Badge--common');

    Simulate.click(errorBadge);

    validateCalled.should.equal(true);
  });

  it('should call setForm when a value is committed in the form selector', function test() {
    let setFormName = null;

    const setForm = (formNameArg) => {
      setFormName = formNameArg;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="collectionobject"
              setForm={setForm}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const formSelector = this.container.querySelector('.cspace-ui-RecordFormSelector--common');
    const input = formSelector.querySelector('input');

    Simulate.mouseDown(input);

    const items = formSelector.querySelectorAll('li');

    Simulate.click(items[2]);

    setFormName.should.equal('photo');
  });

  it('should call save and closeModal when the confirmation modal save button is clicked', function test() {
    let saveCallback = null;

    const save = (callbackArg) => {
      saveCallback = callbackArg;
    };

    let recordCreatedNewCsid = null;
    let recordCreatedIsNavigating = null;

    const handleRecordCreated = (newRecordCsidArg, isNavigatingArg) => {
      recordCreatedNewCsid = newRecordCsidArg;
      recordCreatedIsNavigating = isNavigatingArg;
    };

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="collectionobject"
            openModalName={ConfirmRecordNavigationModal.modalName}
            save={save}
            closeModal={closeModal}
            onRecordCreated={handleRecordCreated}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const modal = findWithType(recordEditorResult, ConfirmRecordNavigationModal);

    modal.props.onSaveButtonClick();

    saveCallback.should.not.equal(null);
    closeModalCalled.should.equal(true);

    // The save callback should call the onRecordCreated function, passing in true for
    // isNavigating.

    const newCsid = '1234';

    saveCallback(newCsid);

    recordCreatedNewCsid.should.equal(newCsid);
    recordCreatedIsNavigating.should.equal(true);
  });

  it('should call revert and closeModal when the confirmation modal revert button is clicked', function test() {
    let revertCalled = false;

    const revert = () => {
      revertCalled = true;
    };

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="collectionobject"
            openModalName={ConfirmRecordNavigationModal.modalName}
            revert={revert}
            closeModal={closeModal}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const modal = findWithType(recordEditorResult, ConfirmRecordNavigationModal);

    modal.props.onRevertButtonClick();

    revertCalled.should.equal(true);
    closeModalCalled.should.equal(true);
  });

  it('should call closeModal and onSaveCancelled when the confirmation modal cancel button is clicked', function test() {
    let saveCancelledCalled = false;

    const handleSaveCancelled = () => {
      saveCancelledCalled = true;
    };

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="collectionobject"
            openModalName={ConfirmRecordNavigationModal.modalName}
            onSaveCancelled={handleSaveCancelled}
            closeModal={closeModal}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const modal = findWithType(recordEditorResult, ConfirmRecordNavigationModal);

    modal.props.onCancelButtonClick();

    saveCancelledCalled.should.equal(true);
    closeModalCalled.should.equal(true);
  });

  it('should call transitionRecord, closeModal, and onRecordTransitioned when the delete modal delete button is clicked', function test() {
    let transitionRecordTransitionName = null;

    const transitionRecord = (transitionNameArg) => {
      transitionRecordTransitionName = transitionNameArg;

      return Promise.resolve();
    };

    let recordTransitionedTransitionName = null;

    const handleRecordTransitioned = (transitionNameArg) => {
      recordTransitionedTransitionName = transitionNameArg;
    };

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="collectionobject"
            openModalName={ConfirmRecordDeleteModal.modalName}
            transitionRecord={transitionRecord}
            closeModal={closeModal}
            onRecordTransitioned={handleRecordTransitioned}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const modal = findWithType(recordEditorResult, ConfirmRecordDeleteModal);

    modal.props.onDeleteButtonClick();

    transitionRecordTransitionName.should.equal('delete');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        closeModalCalled.should.equal(true);
        recordTransitionedTransitionName.should.equal('delete');

        resolve();
      }, 0);
    });
  });

  it('should call save and closeModal when the lock modal save button is clicked', function test() {
    let saveCallback = null;

    const save = (callbackArg) => {
      saveCallback = callbackArg;

      return Promise.resolve();
    };

    let recordCreatedNewCsid = null;

    const handleRecordCreated = (newRecordCsidArg) => {
      recordCreatedNewCsid = newRecordCsidArg;
    };

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="movement"
            openModalName={LockRecordModal.modalName}
            save={save}
            closeModal={closeModal}
            onRecordCreated={handleRecordCreated}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const modal = findWithType(recordEditorResult, LockRecordModal);

    modal.props.onSaveOnlyButtonClick();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        saveCallback.should.not.equal(null);
        closeModalCalled.should.equal(true);

        // The save callback should call the onRecordCreated function, passing in true for
        // isNavigating.

        const newCsid = '1234';

        saveCallback(newCsid);

        recordCreatedNewCsid.should.equal(newCsid);

        resolve();
      }, 0);
    });
  });

  it('should call saveWithTransition and closeModal when the lock modal save and lock button is clicked', function test() {
    let saveWithTransitionName = null;
    let saveWithTransitionCallback = null;

    const saveWithTransition = (transitionNameArg, callbackArg) => {
      saveWithTransitionName = transitionNameArg;
      saveWithTransitionCallback = callbackArg;

      return Promise.resolve();
    };

    let recordCreatedNewCsid = null;

    const handleRecordCreated = (newRecordCsidArg) => {
      recordCreatedNewCsid = newRecordCsidArg;
    };

    let closeModalCalled = false;

    const closeModal = () => {
      closeModalCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="movement"
            openModalName={LockRecordModal.modalName}
            saveWithTransition={saveWithTransition}
            closeModal={closeModal}
            onRecordCreated={handleRecordCreated}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const modal = findWithType(recordEditorResult, LockRecordModal);

    modal.props.onSaveLockButtonClick();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        saveWithTransitionName.should.equal('lock');
        saveWithTransitionCallback.should.not.equal(null);
        closeModalCalled.should.equal(true);

        // The save callback should call the onRecordCreated function, passing in true for
        // isNavigating.

        const newCsid = '1234';

        saveWithTransitionCallback(newCsid);

        recordCreatedNewCsid.should.equal(newCsid);

        resolve();
      }, 0);
    });
  });
});
