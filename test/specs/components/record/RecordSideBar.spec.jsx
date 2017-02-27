import React from 'react';
import { render } from 'react-dom';
import createTestContainer from '../../../helpers/createTestContainer';
import RecordSideBar from '../../../../src/components/record/RecordSideBar';

const expect = chai.expect;

chai.should();

const config = {
  recordTypes: {},
};

describe('RecordSideBar', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render nothing if the record type is unknown', function test() {
    render(
      <RecordSideBar
        config={config}
        recordType="foo"
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });
});
