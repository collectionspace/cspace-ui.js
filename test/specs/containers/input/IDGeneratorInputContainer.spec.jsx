import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { components as inputComponents } from 'cspace-input';
import { findWithType } from 'react-shallow-testutils';
import { ConnectedIDGeneratorInput } from '../../../../src/containers/input/IDGeneratorInputContainer';

import {
  CREATE_ID_STARTED,
  READ_ID_GENERATOR_STARTED,
} from '../../../../src/constants/actionCodes';

chai.should();

const { IDGeneratorInput } = inputComponents;
const mockStore = configureMockStore([thunk]);

describe('IDGeneratorInputContainer', () => {
  const config = Immutable.Map();

  const store = mockStore({
    idGenerator: Immutable.fromJS({
      accession: {
        csid: '9dd92952-c384-44dc-a736-95e435c1759c',
        messages: {
          type: {
            id: 'idGenerator.accession.type',
            defaultMessage: 'Accession',
          },
        },
        sample: '2016.1.23',
      },
      loanin: {
        csid: 'ed87e7c6-0678-4f42-9d33-f671835586ef',
        messages: {
          type: {
            id: 'idGenerator.loanin.type',
            defaultMessage: 'Loan In',
          },
        },
      },
    }),
  });

  const intl = {
    formatDate: () => null,
    formatTime: () => null,
    formatRelative: () => null,
    formatNumber: () => null,
    formatPlural: () => null,
    formatMessage: (message) => `formatted ${message.id}`,
    formatHTMLMessage: () => null,
    now: () => null,
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should set pattern on IDGeneratorInput', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        store={store}
        config={config}
        intl={intl}
        source="accession"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    input.props.patterns.should.deep.equal([{
      name: 'accession',
      type: 'formatted idGenerator.accession.type',
      sample: '2016.1.23',
    }]);
  });

  it('should accept multiple comma separated source values', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        store={store}
        config={config}
        intl={intl}
        source="accession,loanin"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    input.props.patterns.should.deep.equal([
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

  it('should accept an array of source values', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        config={config}
        store={store}
        intl={intl}
        source={['accession', 'loanin']}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    input.props.patterns.should.deep.equal([
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

  it('should apply the idGeneratorTransfrom from config to the sample values', () => {
    const transformConfig = {
      idGeneratorTransform: (number) => (number ? `FOO ${number}` : number),
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        config={transformConfig}
        store={store}
        intl={intl}
        source={['accession', 'loanin']}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    input.type.should.equal(IDGeneratorInput);

    input.props.patterns.should.deep.equal([
      {
        name: 'accession',
        type: 'formatted idGenerator.accession.type',
        sample: 'FOO 2016.1.23',
      },
      {
        name: 'loanin',
        type: 'formatted idGenerator.loanin.type',
        sample: undefined,
      },
    ]);
  });

  it('should set sampleColumnLabel from intl', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        config={config}
        store={store}
        intl={intl}
        source="accession"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    input.props.sampleColumnLabel.should.equal('formatted idGeneratorInput.column.sample');
  });

  it('should set typeColumnLabel from intl', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        store={store}
        config={config}
        intl={intl}
        source="accession"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    input.props.typeColumnLabel.should.equal('formatted idGeneratorInput.column.type');
  });

  it('should connect onOpen to readIDGenerator action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        config={config}
        store={store}
        intl={intl}
        source="accession"
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    // The call to onOpen will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readIDGenerator action creator gets called, and
    // dispatches READ_ID_GENERATOR_STARTED.

    try {
      input.props.onOpen([{
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

  it('should connect generateID to createID action creator', () => {
    const csid = '1234';
    const idGeneratorName = 'accession';
    const path = ['identificationNumber'];

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedIDGeneratorInput
        store={store}
        csid={csid}
        source={idGeneratorName}
        intl={intl}
        config={config}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const input = findWithType(result, IDGeneratorInput);

    // The call to generateID will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the createID action creator gets called, and
    // dispatches CREATE_ID_STARTED.

    try {
      input.props.generateID(idGeneratorName, path);
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', CREATE_ID_STARTED);
      action.should.have.deep.property('meta.idGeneratorName', idGeneratorName);
      action.should.have.deep.property('meta.csid', csid);
      action.should.have.deep.property('meta.path').that.deep.equals(path);
    }
  });
});
