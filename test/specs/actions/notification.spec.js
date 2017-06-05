import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  showNotification,
  removeNotification,
} from '../../../src/actions/notification';

chai.should();

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
});
