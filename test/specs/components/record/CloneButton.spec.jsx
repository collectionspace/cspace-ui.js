import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import CloneButton from '../../../../src/components/record/CloneButton';

const { expect } = chai;

chai.should();

describe('CloneButton', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <CloneButton csid="1234" />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if isCloneable is false', function test() {
    render(
      <IntlProvider locale="en">
        <CloneButton isCloneable={false} />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });
});
