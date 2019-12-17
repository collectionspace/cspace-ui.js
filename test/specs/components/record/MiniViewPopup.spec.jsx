import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { Popup } from 'cspace-layout';
import MiniViewPopup from '../../../../src/components/record/MiniViewPopup';
import MiniViewContainer from '../../../../src/containers/record/MiniViewContainer';

describe('MiniViewPopup', () => {
  it('should render a Popup containing a MiniView', () => {
    const shallowRenderer = createRenderer();

    const result = shallowRenderer.render(<MiniViewPopup />);
    const popup = findWithType(result, Popup);

    popup.should.not.equal(null);

    const miniView = findWithType(popup, MiniViewContainer);

    miniView.should.not.equal(null);
  });
});
