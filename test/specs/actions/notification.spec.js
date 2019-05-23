/* global window */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../../../src/constants/actionCodes';

import {
  STATUS_ERROR,
} from '../../../src/constants/notificationStatusCodes';

import {
  showNotification,
  removeNotification,
  showValidationNotification,
  removeValidationNotification,
  openModal,
  closeModal,
} from '../../../src/actions/notification';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('notification action creator', function suite() {
  describe('showNotification', function actionSuite() {
    const notificationDescriptor = {
      message: {
        id: 'messageId',
        defaultMessage: 'message {title}',
      },
      values: {
        title: 'title',
      },
      status: 'error',
      date: new Date(),
      autoClose: true,
    };

    const notificationID = '1';

    it('should create a SHOW_NOTIFICATION action', function test() {
      showNotification(notificationDescriptor, notificationID).should.deep.equal({
        type: SHOW_NOTIFICATION,
        payload: notificationDescriptor,
        meta: {
          notificationID,
        },
      });
    });
  });

  describe('removeNotification', function actionSuite() {
    it('should create a REMOVE_NOTIFICATION action', function test() {
      const notificationID = '1';

      removeNotification(notificationID).should.deep.equal({
        type: REMOVE_NOTIFICATION,
        meta: {
          notificationID,
        },
      });
    });
  });

  describe('showValidationNotification', function actionSuite() {
    const recordType = 'collectionspace';
    const csid = '1234';

    it('should create a SHOW_NOTIFICATION action', function test() {
      const action = showValidationNotification(recordType, csid);

      action.type.should.equal(SHOW_NOTIFICATION);

      action.payload.should.include({
        recordType,
        csid,
        type: 'validation',
        status: STATUS_ERROR,
      });

      action.payload.date.getTime().should.be.closeTo((new Date()).getTime(), 20);
    });
  });

  describe('removeValidationNotification', function actionSuite() {
    it('should create a REMOVE_NOTIFICATION action', function test() {
      removeValidationNotification().should.include({
        type: REMOVE_NOTIFICATION,
      });
    });
  });

  describe('openModal', function actionSuite() {
    it('should dispatch an OPEN_MODAL action', function test() {
      const store = mockStore({
        notification: Immutable.Map(),
      });

      const name = 'modalName';

      store.dispatch(openModal(name));

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: OPEN_MODAL,
        meta: {
          name,
        },
      });
    });
  });

  describe('closeModal', function actionSuite() {
    it('should dispatch an CLOSE_MODAL action', function test() {
      const store = mockStore({
        notification: Immutable.Map({
          modal: 'modalName',
        }),
      });

      store.dispatch(closeModal());

      const actions = store.getActions();

      actions.should.have.lengthOf(1);

      actions[0].should.deep.equal({
        type: CLOSE_MODAL,
      });
    });

    it('should call the callback specified in the last OPEN_MODAL call', function test() {
      let store = mockStore({
        notification: Immutable.Map(),
      });

      const name = 'modalName';

      let handlerCalled = false;

      const handleClose = () => {
        handlerCalled = true;
      };

      store.dispatch(openModal(name, handleClose));

      store = mockStore({
        notification: Immutable.Map({
          modal: name,
        }),
      });

      store.dispatch(closeModal());

      return new Promise((resolve) => {
        window.setTimeout(() => {
          handlerCalled.should.equal(true);

          resolve();
        }, 10);
      });
    });
  });

  it('should open a new modal if a previous one has not been closed', function test() {
    let store = mockStore({
      notification: Immutable.Map(),
    });

    let handleCloseSecondCalled = false;

    const handleCloseSecond = () => {
      handleCloseSecondCalled = true;
    };

    store.dispatch(openModal('first'));

    store = mockStore({
      notification: Immutable.Map({
        modal: 'first',
      }),
    });

    store.dispatch(openModal('second', handleCloseSecond));

    store = mockStore({
      notification: Immutable.Map({
        modal: 'second',
      }),
    });

    store.dispatch(closeModal());

    return new Promise((resolve) => {
      window.setTimeout(() => {
        handleCloseSecondCalled.should.equal(true);

        resolve();
      }, 10);
    });
  });

  it('should still call the close callback of a modal that is replaced without closing', function test() {
    let store = mockStore({
      notification: Immutable.Map(),
    });

    let handleCloseFirstCalled = false;

    const handleCloseFirst = () => {
      handleCloseFirstCalled = true;
    };

    store.dispatch(openModal('first', handleCloseFirst));

    store = mockStore({
      notification: Immutable.Map({
        modal: 'first',
      }),
    });

    store.dispatch(openModal('second'));

    store = mockStore({
      notification: Immutable.Map({
        modal: 'second',
      }),
    });

    store.dispatch(closeModal());

    return new Promise((resolve) => {
      window.setTimeout(() => {
        handleCloseFirstCalled.should.equal(true);

        resolve();
      }, 10);
    });
  });

  it('should chain the onClose callback of a previously opened modal that has not been closed', function test() {
    let store = mockStore({
      notification: Immutable.Map(),
    });

    let handleCloseFirstCalled = false;

    const handleCloseFirst = () => {
      handleCloseFirstCalled = true;
    };

    let handleCloseSecondCalled = false;

    const handleCloseSecond = () => {
      handleCloseSecondCalled = true;
    };

    store.dispatch(openModal('first', handleCloseFirst));

    store = mockStore({
      notification: Immutable.Map({
        modal: 'first',
      }),
    });

    store.dispatch(openModal('second', handleCloseSecond));

    store = mockStore({
      notification: Immutable.Map({
        modal: 'second',
      }),
    });

    store.dispatch(closeModal());

    return new Promise((resolve) => {
      window.setTimeout(() => {
        handleCloseSecondCalled.should.equal(true);
        handleCloseFirstCalled.should.equal(true);

        resolve();
      }, 10);
    });
  });
});
