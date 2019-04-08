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
import merge from 'lodash/merge';
import { components as inputComponents } from 'cspace-input';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/containers/layout/PanelContainer';
import RecordEditor from '../../../../src/components/record/RecordEditor';
import RecordHeader from '../../../../src/components/record/RecordHeader';
import ConfirmRecordNavigationModal from '../../../../src/components/record/ConfirmRecordNavigationModal';
import ConfirmRecordDeleteModal from '../../../../src/components/record/ConfirmRecordDeleteModal';
import LockRecordModal from '../../../../src/components/record/LockRecordModal';
import HierarchyReparentNotifier from '../../../../src/components/record/HierarchyReparentNotifier';
import ReportModal from '../../../../src/components/invocable/ReportModal';
ReportModal;

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
      fields: {},
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.collectionobject.default.name',
              defaultMessage: 'Default Template',
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
      fields: {},
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.movement.default.name',
              defaultMessage: 'Default Template',
            },
          },
          template: <div>Default</div>,
        },
        other: {
          messages: {
            name: {
              id: 'form.movement.other.name',
              defaultMessage: 'Other Template',
            },
          },
          template: <div>Other</div>,
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
      fields: {},
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.loanin.default.name',
              defaultMessage: 'Default Template',
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
    loanout: {
      defaultForm: 'other',
      fields: {},
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.loanout.default.name',
              defaultMessage: 'Default Template',
            },
          },
          template: <div>Default</div>,
        },
        other: {
          messages: {
            name: {
              id: 'form.loanout.other.name',
              defaultMessage: 'Other Template',
            },
          },
          template: <div>Other</div>,
        },
      },
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Loan Out',
          },
        },
      },
      title: () => 'Title',
    },
    report: {
      defaultForm: 'other',
      fields: {},
      forms: {
        default: {
          messages: {
            name: {
              id: 'form.report.default.name',
              defaultMessage: 'Reporting template',
            },
          },
          template: <div>Default</div>,
        },
        other: {
          messages: {
            name: {
              id: 'form.loanout.other.name',
              defaultMessage: 'Other Template',
            },
          },
          template: <div>Other</div>,
        },
      },
      messages: {
        record: {
          name: {
            id: 'name',
            defaultMessage: 'Reporting',
          },
        },
      },
      title: () => 'Title',
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
    transition: {
      delete: 'CU',
    },
  },
  movement: {
    data: 'CRUDL',
  },
  loanin: {
    data: 'CRUDL',
  },
  loanout: {
    data: 'CRUDL',
  },
  reporting: {
    data: 'RUL',
  },
});

const expectedClassName = 'cspace-ui-RecordEditor--normal cspace-ui-RecordEditor--common';

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

  it('should render the \'default\' form if no formName is supplied, and no default form is configured', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="movement"
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RecordFormSelector--common input').value.should.equal('Default Template');
    this.container.querySelector('.cspace-ui-RecordForm--common').textContent.should.equal('Default');
  });

  it('should render the configured default form if no formName is supplied', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              csid="1234"
              recordType="loanout"
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    this.container.querySelector('.cspace-ui-RecordFormSelector--common input').value.should.equal('Other Template');
    this.container.querySelector('.cspace-ui-RecordForm--common').textContent.should.equal('Other');
  });

  it('should call readRecord when mounted if a csid is provided', function test() {
    let readRecordCalled = false;

    const readRecord = () => {
      readRecordCalled = true;

      return Promise.resolve();
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

  it('should call onRecordReadComplete when the record has been read', function test() {
    const readRecord = () => Promise.resolve();

    let handlerCalled = false;

    const handleRecordReadComplete = () => {
      handlerCalled = true;
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
              onRecordReadComplete={handleRecordReadComplete}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        handlerCalled.should.equal(true);

        resolve();
      }, 0);
    });
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

      return Promise.resolve();
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

  it('should call removeValidationNotification and removeNotification when unmounted', function test() {
    let removeValidationNotificationCalled = false;

    const removeValidationNotification = () => {
      removeValidationNotificationCalled = true;
    };

    let removeNotificationId = null;

    const removeNotification = (notificationIdArg) => {
      removeNotificationId = notificationIdArg;
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
              removeNotification={removeNotification}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    unmountComponentAtNode(this.container);

    removeValidationNotificationCalled.should.equal(true);
    removeNotificationId.should.equal(HierarchyReparentNotifier.notificationID);
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

  it('should call save followed by onRecordSaved when the save button is clicked', function test() {
    const handleRecordCreated = () => null;

    let saveCallback = null;

    const save = (callbackArg) => {
      saveCallback = callbackArg;

      return Promise.resolve();
    };

    let handleRecordSavedCalled = false;

    const handleRecordSaved = () => {
      handleRecordSavedCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={config}
              perms={perms}
              recordType="collectionobject"
              save={save}
              onRecordCreated={handleRecordCreated}
              onRecordSaved={handleRecordSaved}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    saveCallback.should.equal(handleRecordCreated);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        handleRecordSavedCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should call the record type\'s configured onRecordSaved handler following save', function test() {
    const save = () => Promise.resolve();

    let handleRecordSavedCalled = false;

    const handleRecordSaved = () => {
      handleRecordSavedCalled = true;
    };

    const updatedConfig = merge({}, config, {
      recordTypes: {
        collectionobject: {
          onRecordSaved: handleRecordSaved,
        },
      },
    });

    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <RecordEditor
              config={updatedConfig}
              perms={perms}
              recordType="collectionobject"
              save={save}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const saveButton = this.container.querySelector('button[name=save]');

    Simulate.click(saveButton);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        handleRecordSavedCalled.should.equal(true);

        resolve();
      }, 0);
    });
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
              perms={perms}
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
              perms={perms}
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
              perms={perms}
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
              perms={perms}
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
              perms={perms}
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
              perms={perms}
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
              perms={perms}
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

      return Promise.resolve();
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

    modal.props.onCancelButtonClick({
      stopPropagation: () => {},
    });

    saveCancelledCalled.should.equal(true);
    closeModalCalled.should.equal(true);
  });

  context('when isHardDelete is true', function context() {
    it('should call deleteRecord, closeModal, and onRecordDeleted when the delete modal delete button is clicked', function test() {
      let deleteRecordCalled = false;

      const deleteRecord = () => {
        deleteRecordCalled = true;

        return Promise.resolve();
      };

      let recordDeletedCalled = null;

      const handleRecordDeleted = () => {
        recordDeletedCalled = true;
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
              isHardDelete
              recordType="collectionobject"
              openModalName={ConfirmRecordDeleteModal.modalName}
              deleteRecord={deleteRecord}
              closeModal={closeModal}
              onRecordDeleted={handleRecordDeleted}
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

      deleteRecordCalled.should.equal(true);

      return new Promise((resolve) => {
        window.setTimeout(() => {
          closeModalCalled.should.equal(true);
          recordDeletedCalled.should.equal(true);

          resolve();
        }, 0);
      });
    });
  });

  context('when isHardDelete is false', function context() {
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

  it('should call transitionRecord when the deprecate button is clicked', function test() {
    let transitionRecordTransitionName = null;

    const transitionRecord = (transitionNameArg) => {
      transitionRecordTransitionName = transitionNameArg;

      return Promise.resolve();
    };

    let recordTransitionedTransitionName = null;

    const handleRecordTransitioned = (transitionNameArg) => {
      recordTransitionedTransitionName = transitionNameArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="collectionobject"
            transitionRecord={transitionRecord}
            onRecordTransitioned={handleRecordTransitioned}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const recordHeader = findWithType(recordEditorResult, RecordHeader);

    recordHeader.props.onDeprecateButtonClick();

    transitionRecordTransitionName.should.equal('deprecate');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        recordTransitionedTransitionName.should.equal('deprecate');

        resolve();
      }, 0);
    });
  });

  it('should call transitionRecord when the undeprecate button is clicked', function test() {
    let transitionRecordTransitionName = null;

    const transitionRecord = (transitionNameArg) => {
      transitionRecordTransitionName = transitionNameArg;

      return Promise.resolve();
    };

    let recordTransitionedTransitionName = null;

    const handleRecordTransitioned = (transitionNameArg) => {
      recordTransitionedTransitionName = transitionNameArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <RecordEditor
            config={config}
            csid="1234"
            recordType="collectionobject"
            transitionRecord={transitionRecord}
            onRecordTransitioned={handleRecordTransitioned}
          />
        </StoreProvider>
      </IntlProvider>);

    const result = shallowRenderer.getRenderOutput();
    const recordEditor = findWithType(result, RecordEditor);
    const recordEditorRenderer = createRenderer();

    recordEditorRenderer.render(recordEditor);

    const recordEditorResult = recordEditorRenderer.getRenderOutput();
    const recordHeader = findWithType(recordEditorResult, RecordHeader);

    recordHeader.props.onUndeprecateButtonClick();

    transitionRecordTransitionName.should.equal('undeprecate');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        recordTransitionedTransitionName.should.equal('undeprecate');

        resolve();
      }, 0);
    });
  });

  it('should call openModal when the run button is clicked', function test() {
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
              perms={perms}
              recordType="report"
              openModal={openModal}
            />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container);

    const runButton = this.container.querySelector('button[name=run]');

    Simulate.click(runButton);
  });
});
