import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { components as inputComponents } from 'cspace-input';
import { Modal } from 'cspace-layout';
import CancelButton from '../../../../src/components/navigation/CancelButton';
import SearchPinButton from '../../../../src/components/search/SearchPinButton';
import PinQueryModal from '../../../../src/components/search/PinQueryModal';

const { LineInput, MultilineInput } = inputComponents;

chai.should();

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

describe('PinQueryModal', () => {
  it('should render a Modal containing name and description inputs', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<PinQueryModal />, { intl });

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Modal);

    findWithType(result, LineInput).should.not.equal(null);
    findWithType(result, MultilineInput).should.not.equal(null);
  });

  it('should render a cancel button and a save button in the button bar, with save disabled when the name is blank', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<PinQueryModal />, { intl });

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = result.props.renderButtonBar();

    findWithType(buttonBar, CancelButton).should.not.equal(null);
    findWithType(buttonBar, SearchPinButton).props.disabled.should.equal(true);
  });

  it('should call pinQuery and onQueryPinned when the pin button is clicked', () => {
    let savedName = null;
    let savedDescription = null;

    const pinQuery = (nameArg, descriptionArg) => {
      savedName = nameArg;
      savedDescription = descriptionArg;
    };

    let queryPinnedCalled = false;

    const handleQueryPinned = () => {
      queryPinnedCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PinQueryModal
        pinQuery={pinQuery}
        onQueryPinned={handleQueryPinned}
      />, { intl },
    );

    let result = shallowRenderer.getRenderOutput();

    findWithType(result, LineInput).props.onCommit(null, 'my query');
    findWithType(result, MultilineInput).props.onCommit(null, 'a description');

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const saveButton = findWithType(buttonBar, SearchPinButton);

    saveButton.props.disabled.should.equal(false);

    saveButton.props.onClick();

    savedName.should.equal('my query');
    savedDescription.should.equal('a description');
    queryPinnedCalled.should.equal(true);
  });

  it('should reset the name and description when reopened', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<PinQueryModal isOpen />, { intl });

    let result = shallowRenderer.getRenderOutput();

    findWithType(result, LineInput).props.onCommit(null, 'my query');

    shallowRenderer.render(<PinQueryModal isOpen={false} />, { intl });
    shallowRenderer.render(<PinQueryModal isOpen />, { intl });

    result = shallowRenderer.getRenderOutput();

    findWithType(result, LineInput).props.value.should.equal('');
  });
});
