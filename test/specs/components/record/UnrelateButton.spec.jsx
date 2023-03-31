import React from 'react';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import UnrelateButton from '../../../../src/components/record/UnrelateButton';

const { expect } = chai;

chai.should();

describe('UnrelateButton', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a button', function test() {
    render(
      <IntlProvider locale="en">
        <UnrelateButton />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('BUTTON');
  });

  it('should render nothing if isUnrelatable is false', function test() {
    render(
      <IntlProvider locale="en">
        <UnrelateButton isUnrelatable={false} />
      </IntlProvider>, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });
});
