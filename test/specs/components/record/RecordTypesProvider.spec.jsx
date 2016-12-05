import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import RecordTypesProvider from '../../../../src/components/record/RecordTypesProvider';

chai.should();

describe('RecordTypesProvider', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should provide record plugins in context', function test() {
    const recordTypes = {};

    let providedRecordTypes = null;

    class StubComponent extends Component {
      constructor(props, context) {
        super(props, context);

        providedRecordTypes = context.recordTypes;
      }

      render() {
        return null;
      }
    }

    StubComponent.contextTypes = {
      recordTypes: PropTypes.object,
    };

    render(
      <RecordTypesProvider recordTypes={recordTypes}>
        <StubComponent />
      </RecordTypesProvider>, this.container);

    providedRecordTypes.should.equal(recordTypes);
  });
});
