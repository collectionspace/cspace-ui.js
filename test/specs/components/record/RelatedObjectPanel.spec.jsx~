import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RelatedObjectPanel from '../../../../src/components/record/RelatedObjectPanel';

chai.should();

const recordData = Immutable.fromJS({
  document: {
    'ns2:collectionspace_core': {
      updatedAt: '2017-01-26T08:08:47.026Z',
    },
  },
});

describe('RelatedObjectPanel', function suite() {
  it('should render a search panel', function test() {
    const config = {};
    const recordType = 'collectionobject';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedObjectPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchPanelContainer);

    result.props.config.should.equal(config);
    result.props.recordType.should.equal(recordType);
  });

  it('should rerender with the new search descriptor when it is changed by the search panel', function test() {
    const config = {};
    const recordType = 'collectionobject';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedObjectPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();
    const newSearchDescriptor = { foo: 'bar', seqID: 'seq1234' };

    result.props.onSearchDescriptorChange(newSearchDescriptor);

    const newResult = shallowRenderer.getRenderOutput();

    newResult.props.searchDescriptor.should.equal(newSearchDescriptor);
  });

  it('should rerender with a new search descriptor when a new csid is supplied via props', function test() {
    const config = {};
    const recordType = 'collectionobject';
    const csid = '1234';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedObjectPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.searchDescriptor.searchQuery.should.have.property('rel', csid);

    const newCsid = '5678';

    shallowRenderer.render(
      <RelatedObjectPanel
        config={config}
        csid={newCsid}
        recordData={recordData}
        recordType={recordType}
      />);

    const newResult = shallowRenderer.getRenderOutput();

    newResult.props.searchDescriptor.searchQuery.should.have.property('rel', newCsid);
  });
});
