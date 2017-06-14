import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import ValidationErrorNotification from '../../../../src/components/notification/ValidationErrorNotification';
import ValidationErrorNotificationContainer from '../../../../src/containers/notification/ValidationErrorNotificationContainer';

chai.should();

const mockStore = configureMockStore();

describe('ValidationErrorNotificationContainer', function suite() {
  it('should set props on ValidationErrorNotification', function test() {
    const csid = '1234';
    const validationErrors = Immutable.Map();

    const store = mockStore({
      record: Immutable.fromJS({
        [csid]: {
          validation: validationErrors,
        },
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ValidationErrorNotificationContainer csid={csid} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ValidationErrorNotification);
    result.props.should.have.property('errors', validationErrors);
  });
});
