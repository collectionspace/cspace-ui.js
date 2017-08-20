import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import RecordFormContainer from '../../../../src/containers/record/RecordFormContainer';
import SubrecordEditor from '../../../../src/components/record/SubrecordEditor';

chai.should();

describe('SubrecordEditor', function suite() {
  it('should render a RecordFormContainer', function test() {
    const config = {
      recordTypes: {
        person: {},
      },
    };

    const recordType = 'person';
    const vocabulary = 'local';
    const csid = '1234';

    const data = Immutable.fromJS({
      document: {},
    });

    const formName = 'default';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SubrecordEditor
        config={config}
        recordType={recordType}
        vocabulary={vocabulary}
        csid={csid}
        data={data}
        formName={formName}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RecordFormContainer);
    result.props.config.should.equal(config);
    result.props.recordType.should.equal(recordType);
    result.props.recordType.should.equal(recordType);
    result.props.vocabulary.should.equal(vocabulary);
    result.props.csid.should.equal(csid);
    result.props.data.should.equal(data);
    result.props.formName.should.equal(formName);
  });
});
