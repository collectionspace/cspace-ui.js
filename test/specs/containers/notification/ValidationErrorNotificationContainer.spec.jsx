import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import ValidationErrorNotification from '../../../../src/components/notification/ValidationErrorNotification';
import ValidationErrorNotificationContainer from '../../../../src/containers/notification/ValidationErrorNotificationContainer';

chai.should();

const mockStore = configureMockStore();

describe('ValidationErrorNotificationContainer', () => {
  it('should set props on ValidationErrorNotification', () => {
    const csid = '1234';
    const validationErrors = Immutable.Map();

    const store = mockStore({
      record: Immutable.fromJS({
        [csid]: {
          validation: validationErrors,
        },
      }),
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ValidationErrorNotificationContainer
        store={store}
        csid={csid}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const notification = findWithType(result, ValidationErrorNotification);

    notification.props.should.have.property('errors', validationErrors);
  });
});
