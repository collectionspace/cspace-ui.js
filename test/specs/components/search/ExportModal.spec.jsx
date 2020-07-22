/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { Modal } from 'cspace-layout';
import CancelButton from '../../../../src/components/navigation/CancelButton';
import ExportButton from '../../../../src/components/search/ExportButton';
import ExportModal from '../../../../src/components/search/ExportModal';
import ExportFieldEditorContainer from '../../../../src/containers/search/ExportFieldEditorContainer';

chai.use(chaiImmutable);
chai.should();

describe('ExportModal', () => {
  it('should render a Modal containing an ExportFieldEditorContainer', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Modal);

    findWithType(result, ExportFieldEditorContainer).should.not.equal(null);
  });

  it('should render a cancel button and an export button in the button bar', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal />,
    );

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = result.props.renderButtonBar();

    findWithType(buttonBar, CancelButton).should.not.equal(null);
    findWithType(buttonBar, ExportButton).should.not.equal(null);
  });

  it('should call openExport followed by onExportOpened when the export button is clicked', () => {
    let openedConfig = null;
    let openedInvocationDescriptor = null;

    const openExport = (configArg, invocationDescriptorArg) => {
      openedConfig = configArg;
      openedInvocationDescriptor = invocationDescriptorArg;

      return Promise.resolve();
    };

    let exportOpenedCalled = false;

    const handleExportOpened = () => {
      exportOpenedCalled = true;
    };

    const config = {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal
        config={config}
        openExport={openExport}
        onExportOpened={handleExportOpened}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const fieldEditor = findWithType(result, ExportFieldEditorContainer);

    const buttonBar = result.props.renderButtonBar();
    const exportButton = findWithType(buttonBar, ExportButton);

    exportButton.props.onClick();

    openedConfig.should.equal(config);
    openedInvocationDescriptor.get('includeFields').should.equal(fieldEditor.props.includeFields);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        exportOpenedCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should update the includeFields prop of the field editor when a value is committed', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal />,
    );

    let result;
    let fieldEditor;

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.size.should.equal(0);
    fieldEditor.props.onIncludeFieldsCommit(0, 'foo');

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['foo']));
  });

  it('should update the includeFields prop of the field editor when a value is added', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal />,
    );

    let result;
    let fieldEditor;

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.size.should.equal(0);
    fieldEditor.props.onIncludeFieldsCommit(0, 'foo');

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['foo']));
    fieldEditor.props.onIncludeFieldsAddInstance(0);

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['', 'foo']));
    fieldEditor.props.onIncludeFieldsAddInstance(2);

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['', 'foo', '']));
  });

  it('should update the includeFields prop of the field editor when a value is removed', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal />,
    );

    let result;
    let fieldEditor;

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.size.should.equal(0);
    fieldEditor.props.onIncludeFieldsCommit(0, 'foo');
    fieldEditor.props.onIncludeFieldsCommit(1, 'bar');

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['foo', 'bar']));
    fieldEditor.props.onIncludeFieldsRemoveInstance(0);

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['bar']));
  });

  it('should update the includeFields prop of the field editor when a value is moved', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal />,
    );

    let result;
    let fieldEditor;

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.size.should.equal(0);
    fieldEditor.props.onIncludeFieldsCommit(0, 'foo');
    fieldEditor.props.onIncludeFieldsCommit(1, 'bar');

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['foo', 'bar']));
    fieldEditor.props.onIncludeFieldsMoveInstance(0, 1);

    result = shallowRenderer.getRenderOutput();
    fieldEditor = findWithType(result, ExportFieldEditorContainer);

    fieldEditor.props.includeFields.should.equal(Immutable.List(['bar', 'foo']));
  });

  it('should set the csids of the invocation descriptor to the csids of the selected items when opened', () => {
    const selectedItems = Immutable.Map({
      1234: true,
      abcd: true,
    });

    let openedInvocationDescriptor = null;

    const openExport = (configArg, invocationDescriptorArg) => {
      openedInvocationDescriptor = invocationDescriptorArg;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportModal />,
    );

    shallowRenderer.render(
      <ExportModal
        isOpen
        openExport={openExport}
        selectedItems={selectedItems}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const buttonBar = result.props.renderButtonBar();
    const exportButton = findWithType(buttonBar, ExportButton);

    exportButton.props.onClick();

    openedInvocationDescriptor.get('csid').should.equal(Immutable.List(['1234', 'abcd']));
  });
});
