import React, { PropTypes } from 'react';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';

export default function RecordPage(props) {
  const {
    csid,
    service,
  } = props.params;

  return (
    <div>
      <RecordTitleBarContainer csid={csid} service={service} />
      <RecordEditorContainer csid={csid} />
    </div>
  );
}

RecordPage.propTypes = {
  params: PropTypes.object.isRequired,
};
