import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import RecordPluginProvider from '../../../../src/components/record/RecordPluginProvider';

chai.should();

describe('RecordPluginProvider', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should provide record plugins in context', function test() {
    const recordPlugins = {};

    let providedRecordPlugins = null;

    class StubComponent extends Component {
      constructor(props, context) {
        super(props, context);

        providedRecordPlugins = context.recordPlugins;
      }

      render() {
        return null;
      }
    }

    StubComponent.contextTypes = {
      recordPlugins: PropTypes.object,
    };

    render(
      <RecordPluginProvider recordPlugins={recordPlugins}>
        <StubComponent />
      </RecordPluginProvider>, this.container);

    providedRecordPlugins.should.equal(recordPlugins);
  });
});
