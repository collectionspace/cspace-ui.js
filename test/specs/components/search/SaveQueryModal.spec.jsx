import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { components as inputComponents } from 'cspace-input';
import { Modal } from 'cspace-layout';
import CancelButton from '../../../../src/components/navigation/CancelButton';
import SearchSaveButton from '../../../../src/components/search/SearchSaveButton';
import SaveQueryModal from '../../../../src/components/search/SaveQueryModal';

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

describe('SaveQueryModal', () => {
  it('should render a Modal containing name and description inputs', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SaveQueryModal />, { intl });

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Modal);

    findWithType(result, LineInput).should.not.equal(null);
    findWithType(result, MultilineInput).should.not.equal(null);
  });

  it('should render a cancel button and a save button in the button bar, with save disabled when the name is blank', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SaveQueryModal />, { intl });

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = result.props.renderButtonBar();

    findWithType(buttonBar, CancelButton).should.not.equal(null);
    findWithType(buttonBar, SearchSaveButton).props.disabled.should.equal(true);
  });

  it('should call saveQuery and onQuerySaved when the save button is clicked', () => {
    let savedName = null;
    let savedDescription = null;

    const saveQuery = (nameArg, descriptionArg) => {
      savedName = nameArg;
      savedDescription = descriptionArg;
    };

    let querySavedCalled = false;

    const handleQuerySaved = () => {
      querySavedCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SaveQueryModal
        saveQuery={saveQuery}
        onQuerySaved={handleQuerySaved}
      />, { intl },
    );

    let result = shallowRenderer.getRenderOutput();

    findWithType(result, LineInput).props.onCommit(null, 'my query');
    findWithType(result, MultilineInput).props.onCommit(null, 'a description');

    result = shallowRenderer.getRenderOutput();

    const buttonBar = result.props.renderButtonBar();
    const saveButton = findWithType(buttonBar, SearchSaveButton);

    saveButton.props.disabled.should.equal(false);

    saveButton.props.onClick();

    savedName.should.equal('my query');
    savedDescription.should.equal('a description');
    querySavedCalled.should.equal(true);
  });

  it('should reset the name and description when reopened', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SaveQueryModal isOpen />, { intl });

    let result = shallowRenderer.getRenderOutput();

    findWithType(result, LineInput).props.onCommit(null, 'my query');

    shallowRenderer.render(<SaveQueryModal isOpen={false} />, { intl });
    shallowRenderer.render(<SaveQueryModal isOpen />, { intl });

    result = shallowRenderer.getRenderOutput();

    findWithType(result, LineInput).props.value.should.equal('');
  });
});
