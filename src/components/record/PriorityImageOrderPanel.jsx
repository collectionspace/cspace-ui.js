import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { useSelector, useDispatch } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';
import { baseComponents as inputBaseComponents, components as inputComponents } from 'cspace-input';
import {
  moveFieldValue,
  saveRecord,
  setFieldValue,
} from '../../actions/record';
import {
  getRecordData,
  getRecordRelationUpdatedTimestamp,
  getSearchResult,
} from '../../reducers';
import { MEDIA_SNAPSHOT_PANEL_SEARCH_NAME } from '../../constants/searchNames';
import { readListItems } from '../search/searchResultHelpers';
import { ConnectedPanel as Panel } from '../../containers/layout/PanelContainer';
import { getSearchDescriptor, priorityImagePath } from './MediaSnapshotPanel';
import PriorityImageRow from './PriorityImageRow';
import styles from '../../../styles/cspace-ui/PriorityImageOrderPanel.css';

const { MiniButton } = inputBaseComponents;
const { RepeatingInput } = inputComponents;

const listType = 'common';

const parentDataPath = priorityImagePath.slice(0, -1);

const messages = defineMessages({
  title: {
    id: 'priorityImageOrderPanel.title',
    defaultMessage: 'Media Priority',
  },
});

const propTypes = {
  color: PropTypes.string,
  config: PropTypes.shape({
    listTypes: PropTypes.object,
    recordTypes: PropTypes.object,
    mediaSnapshotSort: PropTypes.string,
  }),
  csid: PropTypes.string,
  recordType: PropTypes.string,
};

const toRefNameArray = (value) => {
  if (!value) return [];
  if (Immutable.List.isList(value)) return value.toArray();
  return [value];
};

export default function PriorityImageOrderPanel(props) {
  const {
    color,
    config,
    csid,
    recordType,
  } = props;

  const dispatch = useDispatch();

  const seqID = useSelector(
    (state) => getRecordRelationUpdatedTimestamp(state, csid),
  );

  const searchDescriptor = useMemo(
    () => getSearchDescriptor({
      csid,
      mediaRecordType: 'media',
      recordRelationUpdatedTimestamp: seqID,
      recordType,
      sort: config.mediaSnapshotSort || 'title',
    }),
    [config.mediaSnapshotSort, csid, recordType, seqID],
  );

  const storedValue = useSelector(
    (state) => getRecordData(state, csid)?.getIn(priorityImagePath),
  );

  const searchResult = useSelector(
    (state) => getSearchResult(state, MEDIA_SNAPSHOT_PANEL_SEARCH_NAME, searchDescriptor),
  );

  const recordTypeConfig = config.recordTypes[recordType];

  const onCommit = (path, value) => dispatch(setFieldValue(recordTypeConfig, csid, path, value));
  const onMoveInstance = (path, newPosition) => dispatch(
    moveFieldValue(recordTypeConfig, csid, path, newPosition),
  );
  const save = () => dispatch(saveRecord(config, recordTypeConfig, undefined, csid))
    .catch(() => {});

  const labelsByRefName = useMemo(() => {
    const { items } = readListItems(config, listType, searchResult);
    const labels = new Map();

    if (items) {
      items.forEach((item) => {
        const refName = item.get('refName');

        if (refName) {
          labels.set(refName, item.get('identificationNumber') || item.get('title'));
        }
      });
    }

    return labels;
  }, [config, searchResult]);

  const mergedValue = useMemo(() => {
    if (labelsByRefName.size === 0) return null;

    const orderedRefNames = toRefNameArray(storedValue)
      .filter((refName) => labelsByRefName.has(refName));

    const orderedSet = new Set(orderedRefNames);

    labelsByRefName.forEach((label, refName) => {
      if (!orderedSet.has(refName)) orderedRefNames.push(refName);
    });

    return Immutable.List(orderedRefNames);
  }, [labelsByRefName, storedValue]);

  useEffect(() => {
    if (mergedValue && !mergedValue.equals(Immutable.List(toRefNameArray(storedValue)))) {
      onCommit(priorityImagePath, mergedValue);
    }
  }, [mergedValue]);

  if (!mergedValue) return null;

  const saveButton = (
    <MiniButton
      autoWidth
      key="save"
      name="save"
      onClick={save}
    >
      Save
    </MiniButton>
  );

  return (
    <Panel
      buttons={[saveButton]}
      color={color}
      collapsible
      collapsed
      config={config}
      header={<h3><FormattedMessage {...messages.title} /></h3>}
      name="mediaPriorityPanel"
      recordType={recordType}
    >
      <div className={styles.panel}>
        <RepeatingInput
          name="priorityImage"
          parentPath={parentDataPath}
          value={mergedValue}
          onCommit={onCommit}
          onMoveInstance={onMoveInstance}
        >
          <PriorityImageRow labelsByRefName={labelsByRefName} />
        </RepeatingInput>
      </div>
    </Panel>
  );
}

PriorityImageOrderPanel.propTypes = propTypes;
