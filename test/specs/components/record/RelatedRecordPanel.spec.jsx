import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import SearchPanelContainer from '../../../../src/containers/search/SearchPanelContainer';
import RelatedRecordPanel from '../../../../src/components/record/RelatedRecordPanel';

const expect = chai.expect;

chai.should();

const recordData = Immutable.fromJS({
  document: {
    'ns2:collectionspace_core': {
      updatedAt: '2017-01-26T08:08:47.026Z',
    },
  },
});

describe('RelatedRecordPanel', function suite() {
  it('should render a search panel', function test() {
    const config = {};
    const csid = '1234';
    const recordType = 'collectionobject';
    const relatedRecordType = 'group';
    const recordRelationUpdatedTimestamp = '2017-03-06T12:05:34.000Z';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType={relatedRecordType}
        recordRelationUpdatedTimestamp={recordRelationUpdatedTimestamp}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchPanelContainer);

    result.props.config.should.equal(config);
    result.props.recordType.should.equal(recordType);

    result.props.searchDescriptor.should.deep.equal({
      recordType: relatedRecordType,
      searchQuery: {
        rel: csid,
        p: 0,
        size: 5,
      },
      seqID: recordRelationUpdatedTimestamp,
    });
  });

  it('should render nothing if the record data does not contain updatedAt', function test() {
    const config = {};
    const recordType = 'collectionobject';

    const incompleteData = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {},
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        recordData={incompleteData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should rerender with the new search descriptor when it is changed within the search panel', function test() {
    const config = {};
    const recordType = 'collectionobject';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
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
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.searchDescriptor.searchQuery.should.have.property('rel', csid);

    const newCsid = '5678';

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={newCsid}
        recordData={recordData}
        recordType={recordType}
      />);

    const newResult = shallowRenderer.getRenderOutput();

    newResult.props.searchDescriptor.searchQuery.should.have.property('rel', newCsid);
  });

  it('should maintain the page number, size, and sort when only recordRelationUpdatedTimestamp is changed', function test() {
    const config = {};
    const recordType = 'collectionobject';
    const csid = '1234';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.onSearchDescriptorChange({
      recordType: 'group',
      searchQuery: {
        rel: csid,
        p: 2,
        size: 4,
        sort: 'sortfield',
      },
    });

    shallowRenderer.render(
      <RelatedRecordPanel
        config={config}
        csid={csid}
        recordData={recordData}
        recordType={recordType}
        relatedRecordType="group"
        recordRelationUpdatedTimestamp="2017-03-27T17:56.03.000Z"
      />);

    const newResult = shallowRenderer.getRenderOutput();

    newResult.props.searchDescriptor.searchQuery.p.should.equal(2);
    newResult.props.searchDescriptor.searchQuery.size.should.equal(4);
    newResult.props.searchDescriptor.searchQuery.sort.should.equal('sortfield');
  });
});
