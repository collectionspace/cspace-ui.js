import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import NotificationBar from '../../../../src/components/notification/NotificationBar';
import Notification from '../../../../src/components/notification/Notification';

chai.should();

describe('NotificationBar', function suite() {
  it('should render as a div', function test() {
    const notifications = Immutable.OrderedMap();

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<NotificationBar notifications={notifications} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');
  });

  it('should render a notification for each supplied notification descriptor', function test() {
    const notifications = Immutable.OrderedMap({
      1: {},
      2: {},
      3: {},
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<NotificationBar notifications={notifications} />);

    const result = shallowRenderer.getRenderOutput();

    findAllWithType(result, Notification).should.have.lengthOf(notifications.size);
  });
});
