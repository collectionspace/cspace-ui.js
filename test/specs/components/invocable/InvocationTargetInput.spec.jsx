import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { FormattedMessage } from 'react-intl';
import InvocationTargetInput from '../../../../src/components/invocable/InvocationTargetInput';
import RecordSearchInput from '../../../../src/components/search/RecordSearchInput';

chai.should();

describe('InvocationTargetInput', function suite() {
  it('should render as a RecordSearchInput if mode is single, group, or list', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<InvocationTargetInput mode="single" />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RecordSearchInput);
  });

  it('should render an empty div if mode is nocontext', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<InvocationTargetInput mode="nocontext" />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');
  });

  it('should vary the label based on the mode', function test() {
    const shallowRenderer = createRenderer();

    let result;

    shallowRenderer.render(<InvocationTargetInput mode="single" />);

    result = shallowRenderer.getRenderOutput();

    findWithType(result.props.label, FormattedMessage).props.id.should.equal('invocationTargetInput.single');

    shallowRenderer.render(<InvocationTargetInput mode="list" />);

    result = shallowRenderer.getRenderOutput();

    findWithType(result.props.label, FormattedMessage).props.id.should.equal('invocationTargetInput.list');

    shallowRenderer.render(<InvocationTargetInput mode="group" />);

    result = shallowRenderer.getRenderOutput();

    findWithType(result.props.label, FormattedMessage).props.id.should.equal('invocationTargetInput.group');
  });
});
