import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { ConnectedIDGeneratorInput } from '../../../../src/containers/input/IDGeneratorInputContainer';

import {
  READ_ID_GENERATOR_STARTED,
} from '../../../../src/actions/idGenerator';

chai.should();

const { IDGeneratorInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('IDGeneratorInputContainer', function suite() {
  const store = mockStore({
    idGenerator: Immutable.fromJS({
      accession: {
        csid: '9dd92952-c384-44dc-a736-95e435c1759c',
        messageDescriptors: {
          type: {
            id: 'idGenerator.accession.type',
            defaultMessage: 'Accession',
          },
        },
        sample: '2016.1.23',
      },
      loanin: {
        csid: 'ed87e7c6-0678-4f42-9d33-f671835586ef',
        messageDescriptors: {
          type: {
            id: 'idGenerator.loanin.type',
            defaultMessage: 'Loan In',
          },
        },
      },
    }),
  });

  const context = {
    store,
  };

  const intl = {
    formatDate: () => null,
    formatTime: () => null,
    formatRelative: () => null,
    formatNumber: () => null,
    formatPlural: () => null,
    formatMessage: message => `formatted ${message.id}`,
    formatHTMLMessage: () => null,
    now: () => null,
  };

  it('should set pattern on IDGeneratorInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        idGeneratorName="accession"
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(IDGeneratorInput);

    result.props.patterns.should.deep.equal([{
      name: 'accession',
      type: 'formatted idGenerator.accession.type',
      sample: '2016.1.23',
    }]);
  });

  it('should accept multiple comma separated idGeneratorName values', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        idGeneratorName="accession,loanin"
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(IDGeneratorInput);

    result.props.patterns.should.deep.equal([
      {
        name: 'accession',
        type: 'formatted idGenerator.accession.type',
        sample: '2016.1.23',
      },
      {
        name: 'loanin',
        type: 'formatted idGenerator.loanin.type',
        sample: undefined,
      },
    ]);
  });

  it('should accept an array of idGeneratorName values', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        idGeneratorName={['accession', 'loanin']}
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(IDGeneratorInput);

    result.props.patterns.should.deep.equal([
      {
        name: 'accession',
        type: 'formatted idGenerator.accession.type',
        sample: '2016.1.23',
      },
      {
        name: 'loanin',
        type: 'formatted idGenerator.loanin.type',
        sample: undefined,
      },
    ]);
  });

  it('should set sampleColumnLabel from intl', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        idGeneratorName="accession"
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.sampleColumnLabel.should.equal('formatted idGeneratorInput.column.sample');
  });

  it('should set typeColumnLabel from intl', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        idGeneratorName="accession"
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.typeColumnLabel.should.equal('formatted idGeneratorInput.column.type');
  });

  it('should connect onOpen to readIDGenerator action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        idGeneratorName="accession"
        intl={intl}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    // The call to onOpen will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readIDGenerator action creator gets called, and
    // dispatches READ_ID_GENERATOR_STARTED.

    try {
      result.props.onOpen([{
        name: 'accession',
        type: 'formatted idGenerator.accession.type',
        sample: '2016.1.23',
      }]);
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', READ_ID_GENERATOR_STARTED);
      action.should.have.deep.property('meta.idGeneratorName', 'accession');
    }
  });
});
