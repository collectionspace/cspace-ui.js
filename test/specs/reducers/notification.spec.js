import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../../../src/constants/actionCodes';

import reducer, {
  getModal,
  getNotifications,
} from '../../../src/reducers/notification';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

describe('notification reducer', () => {
  it('should have immutable map initial state with notifications key', () => {
    reducer(undefined, {}).should.equal(Immutable.Map({
      notifications: Immutable.OrderedMap(),
    }));
  });

  it('should handle SHOW_NOTIFICATION', () => {
    const notificationID = '1';

    const notificationDescriptor = {
      message: {
        id: 'messageId',
        defaultMessage: 'Saving {title}',
      },
      values: {
        title: 'Title',
      },
      date: new Date(),
      status: 'pending',
    };

    const state = reducer(undefined, {
      type: SHOW_NOTIFICATION,
      payload: notificationDescriptor,
      meta: {
        notificationID,
      },
    });

    state.should.equal(Immutable.Map({
      notifications: Immutable.OrderedMap({
        [notificationID]: notificationDescriptor,
      }),
    }));

    getNotifications(state).should.equal(Immutable.OrderedMap({
      [notificationID]: notificationDescriptor,
    }));
  });

  it('should generate a notification ID when a SHOW_NOTIFICATION action does not provide one', () => {
    const notificationID = undefined;

    const notificationDescriptor = {
      message: {
        id: 'messageId',
        defaultMessage: 'Saving {title}',
      },
      values: {
        title: 'Title',
      },
      date: new Date(),
      status: 'pending',
    };

    const state = reducer(undefined, {
      type: SHOW_NOTIFICATION,
      payload: notificationDescriptor,
      meta: {
        notificationID,
      },
    });

    state.get('notifications').size.should.equal(1);

    const entry = state.get('notifications').entrySeq().first();

    entry[0].should.not.equal(null);
    entry[1].should.equal(notificationDescriptor);
  });

  it('should handle REMOVE_NOTIFICATION', () => {
    const initialState = Immutable.Map({
      notifications: Immutable.OrderedMap({
        1: {},
        2: {},
        3: {},
      }),
    });

    const notificationID = '2';

    const state = reducer(initialState, {
      type: REMOVE_NOTIFICATION,
      meta: {
        notificationID,
      },
    });

    state.should.equal(Immutable.Map({
      notifications: initialState.get('notifications').delete(notificationID),
    }));
  });

  it('should handle OPEN_MODAL', () => {
    const name = 'modalName';

    const state = reducer(undefined, {
      type: OPEN_MODAL,
      meta: {
        name,
      },
    });

    state.should.equal(Immutable.Map({
      modal: name,
      notifications: Immutable.OrderedMap(),
    }));

    getModal(state).should.equal(name);
  });

  it('should handle CLOSE_MODAL', () => {
    const name = 'modalName';

    const initialState = Immutable.Map({
      modal: name,
      notifications: Immutable.OrderedMap(),
    });

    const state = reducer(initialState, {
      type: CLOSE_MODAL,
    });

    state.should.equal(Immutable.Map({
      notifications: Immutable.OrderedMap(),
    }));

    expect(getModal(state)).to.equal(undefined);
  });
});
