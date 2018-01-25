import { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { getDisplayName } from 'cspace-refname';
import { STATUS_WARNING } from '../../constants/notificationStatusCodes';

import {
  refNameToCsid,
  getRecordType,
  getVocabulary,
} from '../../../src/helpers/refNameHelpers';

import {
  normalizeRelationList,
  findBroaderRelation,
} from '../../../src/helpers/relationListHelpers';

const notificationID = 'hierarchyReparentNotifier';

const messages = defineMessages({
  reparentWarning: {
    id: 'hierarchyReparentNotifier.reparentWarning',
    defaultMessage: '{childName} currently has the broader record {parentName}. Its broader record will be changed when this record is saved.',
  },
});

const propTypes = {
  config: PropTypes.object.isRequired,
  csid: PropTypes.string.isRequired,
  childData: PropTypes.instanceOf(Immutable.Map).isRequired,
  readRecord: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default class HierarchyReparentNotifier extends Component {
  componentDidMount() {
    this.readRecords(this.props.childData.keySeq().filter(refName => !!refName));
    this.showNotification();
  }

  componentDidUpdate(prevProps) {
    const {
      childData,
    } = this.props;

    const {
      childData: prevChildData,
    } = prevProps;

    const newRefNames = childData.keySeq().filter(
      refName => refName && !prevChildData.has(refName)
    );

    this.readRecords(newRefNames);

    if (!childData.equals(prevChildData)) {
      this.showNotification();
    }
  }

  readRecords(refNames) {
    const {
      config,
      readRecord,
    } = this.props;

    refNames.forEach((refName) => {
      const childRecordType = getRecordType(config, refName);

      if (!childRecordType) {
        return;
      }

      const childVocabulary = getVocabulary(config, refName);

      if (!childVocabulary) {
        return;
      }

      const childRecordTypeConfig = get(config, ['recordTypes', childRecordType]);
      const childVocabularyConfig = get(childRecordTypeConfig, ['vocabularies', childVocabulary]);
      const childCsid = refNameToCsid(refName);

      readRecord(config, childRecordTypeConfig, childVocabularyConfig, childCsid);
    });
  }

  showNotification() {
    const {
      csid,
      childData,
      removeNotification,
      showNotification,
    } = this.props;

    const items = [];

    childData.forEach((data, childRefName) => {
      if (!childRefName || !data) {
        return;
      }

      const childCsid = refNameToCsid(childRefName);

      const relations = normalizeRelationList(data.getIn(
        ['document', 'rel:relations-common-list', 'relation-list-item']
      ));

      if (!relations) {
        return;
      }

      const relation = findBroaderRelation(childCsid, relations);

      if (relation) {
        const parentCsid = relation.getIn(['object', 'csid']);

        if (parentCsid && parentCsid !== csid) {
          const childName = getDisplayName(childRefName);
          const parentName = getDisplayName(relation.getIn(['object', 'refName']));

          items.push({
            message: messages.reparentWarning,
            values: {
              childName,
              parentName,
            },
          });
        }
      }
    });

    if (items.length > 0) {
      showNotification({
        items,
        date: new Date(),
        status: STATUS_WARNING,
      }, notificationID);
    } else {
      removeNotification(notificationID);
    }
  }

  render() {
    return null;
  }
}

HierarchyReparentNotifier.propTypes = propTypes;
HierarchyReparentNotifier.notificationID = notificationID;
