import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType, findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import RecordFormContainer from '../../../../src/containers/record/RecordFormContainer';
import SubrecordEditor from '../../../../src/components/record/SubrecordEditor';
import SubrecordDetachButton from '../../../../src/components/record/SubrecordDetachButton';

const expect = chai.expect;

chai.should();

describe('SubrecordEditor', function suite() {
  it('should render a RecordFormContainer', function test() {
    const config = {
      recordTypes: {
        contact: {},
        person: {},
      },
    };

    const recordType = 'contact';
    const vocabulary = 'foo';

    const subrecordConfig = {
      recordType,
      vocabulary,
    };

    const perms = Immutable.fromJS({
      [recordType]: {
        data: 'CRUDL',
      },
    });

    const csid = '1234';

    const data = Immutable.fromJS({
      document: {},
    });

    const formName = 'default';

    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <SubrecordEditor
        config={config}
        subrecordConfig={subrecordConfig}
        csid={csid}
        data={data}
        formName={formName}
        perms={perms}
      />);

    const recordFormContainer = findWithType(result, RecordFormContainer);

    recordFormContainer.should.not.equal(null);

    recordFormContainer.props.config.should.equal(config);
    recordFormContainer.props.recordType.should.equal(recordType);
    recordFormContainer.props.vocabulary.should.equal(vocabulary);
    recordFormContainer.props.csid.should.equal(csid);
    recordFormContainer.props.data.should.equal(data);
    recordFormContainer.props.formName.should.equal(formName);
  });

  it('should render nothing if there is no config for the record type', function test() {
    const config = {
      recordTypes: {
        contact: {},
        person: {},
      },
    };

    const recordType = 'foobar';
    const vocabulary = 'foo';

    const subrecordConfig = {
      recordType,
      vocabulary,
    };

    const csid = '1234';

    const data = Immutable.fromJS({
      document: {},
    });

    const formName = 'default';

    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <SubrecordEditor
        config={config}
        subrecordConfig={subrecordConfig}
        csid={csid}
        data={data}
        formName={formName}
      />);

    const recordFormContainer = findAllWithType(result, RecordFormContainer);

    recordFormContainer.length.should.equal(0);
  });

  it('should render nothing if read permission does not exist for the record type', function test() {
    const config = {
      recordTypes: {
        contact: {},
        person: {},
      },
    };

    const recordType = 'contact';
    const vocabulary = 'foo';

    const subrecordConfig = {
      recordType,
      vocabulary,
    };

    const csid = '1234';

    const data = Immutable.fromJS({
      document: {},
    });

    const formName = 'default';

    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <SubrecordEditor
        config={config}
        subrecordConfig={subrecordConfig}
        csid={csid}
        data={data}
        formName={formName}
      />);

    const recordFormContainer = findAllWithType(result, RecordFormContainer);

    recordFormContainer.length.should.equal(0);
  });

  it('should render a SubrecordDetachButton when showDetachButton is true and the data represents an existing record', function test() {
    const config = {
      recordTypes: {
        contact: {},
        person: {},
      },
    };

    const recordType = 'contact';
    const vocabulary = 'foo';

    const subrecordConfig = {
      recordType,
      vocabulary,
    };

    const perms = Immutable.fromJS({
      [recordType]: {
        data: 'CRUDL',
      },
    });

    const csid = '1234';

    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: 'something',
        },
      },
    });

    const formName = 'default';

    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <SubrecordEditor
        config={config}
        subrecordConfig={subrecordConfig}
        csid={csid}
        data={data}
        formName={formName}
        perms={perms}
        showDetachButton
      />);

    const detachButton = findWithType(result, SubrecordDetachButton);

    detachButton.should.not.equal(null);
  });

  it('should not render a SubrecordDetachButton when the data represents a new record', function test() {
    const config = {
      recordTypes: {
        contact: {},
        person: {},
      },
    };

    const recordType = 'contact';
    const vocabulary = 'foo';

    const subrecordConfig = {
      recordType,
      vocabulary,
    };

    const perms = Immutable.fromJS({
      [recordType]: {
        data: 'CRUDL',
      },
    });

    const csid = '1234';

    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          // No uri, so it's a new record.
        },
      },
    });

    const formName = 'default';

    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <SubrecordEditor
        config={config}
        subrecordConfig={subrecordConfig}
        csid={csid}
        data={data}
        formName={formName}
        perms={perms}
        showDetachButton
      />);

    const detachButtons = findAllWithType(result, SubrecordDetachButton);

    detachButtons.should.have.lengthOf(0);
  });

  it('should call detachSubrecord when the subrecord detach button is clicked', function test() {
    const config = {
      recordTypes: {
        person: {},
        contact: {},
      },
    };

    const containerCsid = '9999';

    const recordType = 'contact';
    const vocabulary = 'foo';

    const subrecordConfig = {
      recordType,
      vocabulary,
    };

    const perms = Immutable.fromJS({
      [recordType]: {
        data: 'CRUDL',
      },
    });

    const subrecordName = 'contact';
    const csid = '1234';

    const data = Immutable.fromJS({
      document: {
        'ns2:collectionspace_core': {
          uri: 'something',
        },
      },
    });

    const formName = 'default';

    let detachedConfig = null;
    let detachedContainerCsid = null;
    let detachedCsidField = null;
    let detachedName = null;
    let detachedSubrecordTypeConfig = null;

    const detachSubrecord =
      (configArg, containerCsidArg, csidFieldArg, nameArg, subrecordTypeConfigArg) => {
        detachedConfig = configArg;
        detachedContainerCsid = containerCsidArg;
        detachedCsidField = csidFieldArg;
        detachedName = nameArg;
        detachedSubrecordTypeConfig = subrecordTypeConfigArg;
      };

    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(
      <SubrecordEditor
        config={config}
        containerCsid={containerCsid}
        subrecordConfig={subrecordConfig}
        csid={csid}
        data={data}
        formName={formName}
        name={subrecordName}
        perms={perms}
        showDetachButton
        detachSubrecord={detachSubrecord}
      />);

    const detachButton = findWithType(result, SubrecordDetachButton);

    detachButton.props.onClick();

    detachedConfig.should.equal(config);
    detachedContainerCsid.should.equal(containerCsid);
    expect(detachedCsidField).to.equal(undefined);
    detachedName.should.equal(subrecordName);
    detachedSubrecordTypeConfig.should.equal(config.recordTypes[subrecordConfig.recordType]);
  });
});
