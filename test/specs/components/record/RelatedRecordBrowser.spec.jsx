import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import RelatedRecordBrowser from '../../../../src/components/record/RelatedRecordBrowser';

chai.should();

describe('RecordBrowser', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<RelatedRecordBrowser />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
