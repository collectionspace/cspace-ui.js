import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import BackButton from '../../../../src/components/record/BackButton';

chai.should();

describe('BackButton', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <BackButton />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });
});
