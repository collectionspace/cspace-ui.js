import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import AcceptSelectionButton from '../../../../src/components/search/AcceptSelectionButton';

chai.should();

describe('AcceptSelectionButton', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <AcceptSelectionButton />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should set the supplied className', function test() {
    render(
      <IntlProvider locale="en">
        <AcceptSelectionButton className="foo" />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.contain('foo');
  });
});
