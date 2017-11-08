import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import RelatedRecordButtonBar from '../../../../src/components/record/RelatedRecordButtonBar';

const expect = chai.expect;

chai.should();

describe('RelatedRecordButtonBar', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <RelatedRecordButtonBar />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render nothing when isRelatable is false', function test() {
    render(
      <IntlProvider locale="en">
        <RelatedRecordButtonBar isRelatable={false} />
      </IntlProvider>, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });
});
