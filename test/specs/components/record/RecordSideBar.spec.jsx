import React from 'react';
import { render } from 'react-dom';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordSidebar from '../../../../src/components/record/RecordSidebar';

const expect = chai.expect;

chai.should();

const config = {
  recordTypes: {
    group: {},
  },
};

describe('RecordSidebar', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render nothing if the record type is unknown', function test() {
    render(
      <RecordSidebar
        config={config}
        recordType="foo"
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render nothing if isOpen is false', function test() {
    render(
      <RecordSidebar
        config={config}
        recordType="group"
        isOpen={false}
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });
});
