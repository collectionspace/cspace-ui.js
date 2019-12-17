import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import createTestContainer from '../../../helpers/createTestContainer';
import ErrorBadge from '../../../../src/components/record/ErrorBadge';

chai.should();

describe('ErrorBadge', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(<ErrorBadge />, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should pass provided props to the button', function test() {
    let handlerCalled = false;

    const handleClick = () => {
      handlerCalled = true;
    };

    render(
      <div style={{ position: 'relative', width: '100px' }}>
        <ErrorBadge onClick={handleClick} />
      </div>, this.container,
    );

    const button = this.container.querySelector('button');

    Simulate.click(button);

    handlerCalled.should.equal(true);
  });
});
