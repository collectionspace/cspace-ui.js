import React, { useMemo } from 'react';
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
import { getSearchDescriptor, mediaPriorityPath } from './MediaSnapshotPanel';
import MediaPriorityRow from './MediaPriorityRow';
import styles from '../../../styles/cspace-ui/MediaPriorityOrderPanel.css';

const { MiniButton } = inputBaseComponents;
const { RepeatingInput } = inputComponents;

const listType = 'common';

const parentDataPath = mediaPriorityPath.slice(0, -1);

const messages = defineMessages({
  title: {
    id: 'mediaPriorityOrderPanel.title',
    defaultMessage: 'Media Priority',
  },
  titleWithCount: {
    id: 'mediaPriorityOrderPanel.titleWithCount',
    defaultMessage: '{title}: {count, number}',
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

export default function MediaPriorityOrderPanel(props) {
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
    (state) => getRecordData(state, csid)?.getIn(mediaPriorityPath),
  );

  const searchResult = useSelector(
    (state) => getSearchResult(state, MEDIA_SNAPSHOT_PANEL_SEARCH_NAME, searchDescriptor),
  );

  const recordTypeConfig = config.recordTypes[recordType];

  const onCommit = (path, value) => dispatch(setFieldValue(recordTypeConfig, csid, path, value));

  const save = () => dispatch(saveRecord(config, recordTypeConfig, undefined, csid))
    .catch(() => {});

  const { labelsByRefName, searchLoaded } = useMemo(() => {
    const { list, items } = readListItems(config, listType, searchResult);
    const labels = new Map();

    if (items) {
      items.forEach((item) => {
        const refName = item.get('refName');

        if (refName) {
          const label = [item.get('identificationNumber'), item.get('title')]
            .filter((part) => !!part)
            .join(' – ');

          labels.set(refName, label);
        }
      });
    }

    return {
      labelsByRefName: labels,
      searchLoaded: list?.get('totalItems') != null,
    };
  }, [config, searchResult]);

  const mergedValue = useMemo(() => {
    if (!searchLoaded) return null;

    const orderedRefNames = toRefNameArray(storedValue)
      .filter((refName) => labelsByRefName.has(refName));

    const orderedSet = new Set(orderedRefNames);

    labelsByRefName.forEach((label, refName) => {
      if (!orderedSet.has(refName)) orderedRefNames.push(refName);
    });

    return Immutable.List(orderedRefNames);
  }, [labelsByRefName, searchLoaded, storedValue]);

  const onMoveInstance = (path, newPosition) => {
    if (mergedValue && !mergedValue.equals(Immutable.List(toRefNameArray(storedValue)))) {
      dispatch(setFieldValue(recordTypeConfig, csid, mediaPriorityPath, mergedValue));
    }

    dispatch(moveFieldValue(recordTypeConfig, csid, path, newPosition));
  };

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

  const title = <FormattedMessage {...messages.title} />;

  const header = (
    <h3>
      {
        mergedValue.size === 0
          ? <FormattedMessage {...messages.titleWithCount} values={{ title, count: 0 }} />
          : title
      }
    </h3>
  );

  return (
    <Panel
      buttons={mergedValue.size > 0 ? [saveButton] : []}
      color={color}
      collapsible
      collapsed
      config={config}
      header={header}
      name="mediaPriorityPanel"
      recordType={recordType}
    >
      <div className={styles.panel}>
        {mergedValue.size > 0 && (
          <RepeatingInput
            name="mediaPriority"
            parentPath={parentDataPath}
            value={mergedValue}
            onCommit={onCommit}
            onMoveInstance={onMoveInstance}
          >
            <MediaPriorityRow labelsByRefName={labelsByRefName} />
          </RepeatingInput>
        )}
      </div>
    </Panel>
  );
}

MediaPriorityOrderPanel.propTypes = propTypes;
