import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-addons-test-utils';
import PrefixFilteringControlledInput from '../../../../src/components/input/PrefixFilteringControlledInput';
import VocabularyControlledInput from '../../../../src/components/input/VocabularyControlledInput';

import createTestContainer from '../../../helpers/createTestContainer';

chai.should();

describe('VocabularyControlledInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a PrefixFilteringControlledInput', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<VocabularyControlledInput items={[]} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(PrefixFilteringControlledInput);
  });

  it('should turn the items into options and pass them to the base component', function test() {
    const shallowRenderer = createRenderer();

    const items = [
      {
        refName: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'',
        displayName: 'Ancient Greek',
      },
      {
        refName: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
        displayName: 'English',
      },
    ];

    shallowRenderer.render(<VocabularyControlledInput items={items} />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.options.should.deep.equal([
      {
        value: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'',
        label: 'Ancient Greek',
      },
      {
        value: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
        label: 'English',
      },
    ]);
  });

  it('should pass empty options to the base component when items is undefined', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<VocabularyControlledInput />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.options.should.deep.equal([]);
  });

  it('should call onMount when mounted', function test() {
    let handlerCalled = false;

    const handleMount = () => {
      handlerCalled = true;
    };

    render(<VocabularyControlledInput onMount={handleMount} />, this.container);

    handlerCalled.should.equal(true);
  });
});
