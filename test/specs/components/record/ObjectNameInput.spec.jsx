import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { baseComponents as inputComponents } from 'cspace-input';
import ObjectNameInput from '../../../../src/components/record/ObjectNameInput';

const RecordTypeInput = inputComponents.RecordTypeInput;

chai.should();

const config = {
  recordTypes: {
    collectionobject: {
      serviceConfig: {
        serviceType: 'object',
      },
    },
    utility: {
      serviceConfig: {
        serviceType: 'utility',
      },
    },
    group: {
      name: 'group',
      serviceConfig: {
        serviceType: 'procedure',
        objectName: 'Group',
      },
    },
    person: {
      serviceConfig: {
        serviceType: 'authority',
      },
    },
    other: {
      serviceConfig: {
        serviceType: 'other',
      },
    },
  },
};

const context = {
  config,
};

describe('ObjectNameInput', function suite() {
  it('should render as a RecordTypeInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ObjectNameInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RecordTypeInput);
  });

  it('should set the recordTypes prop to the recordTypes from config that have serviceType of object, procedure, and authority', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ObjectNameInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.recordTypes.should.deep.equal({
      collectionobject: {
        serviceConfig: {
          serviceType: 'object',
        },
      },
      group: {
        name: 'group',
        serviceConfig: {
          serviceType: 'procedure',
          objectName: 'Group',
        },
      },
      person: {
        serviceConfig: {
          serviceType: 'authority',
        },
      },
    });
  });

  it('should convert the value from a service object type to a UI record type', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ObjectNameInput
        value="Group"
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.value.should.equal('group');
  });

  it('should convert the committed value from a UI record type to a service object name', function test() {
    const shallowRenderer = createRenderer();

    let committedPath;
    let committedValue;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    shallowRenderer.render(
      <ObjectNameInput
        onCommit={handleCommit}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onCommit('the path', 'group');

    committedPath.should.equal('the path');
    committedValue.should.equal('Group');
  });
});
