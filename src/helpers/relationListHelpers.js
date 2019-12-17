import Immutable from 'immutable';
import { getItemShortID } from 'cspace-refname';
import { getUrnCsidShortId, isUrnCsid } from './csidHelpers';

// The placeholder csid accepted by the services layer happens to look like a js template string.
// eslint-disable-next-line no-template-curly-in-string
export const placeholderCsid = '${itemCSID}';

export const normalizeRelationList = (value) => {
  if (!value) {
    return null;
  }

  if (Immutable.List.isList(value)) {
    return value;
  }

  if (Immutable.Map.isMap(value)) {
    return Immutable.List.of(value);
  }

  return null;
};

export const findBroaderRelation = (csid, relations) => {
  if (!relations) {
    return null;
  }

  if (isUrnCsid(csid)) {
    const shortId = getUrnCsidShortId(csid);

    return relations.find(
      (relation) => relation.get('predicate') === 'hasBroader'
        && getItemShortID(relation.getIn(['subject', 'refName'])) === shortId,
    );
  }

  const subjectCsid = csid || placeholderCsid;

  return relations.find(
    (relation) => relation.get('predicate') === 'hasBroader'
      && relation.getIn(['subject', 'csid']) === subjectCsid,
  );
};

export const findNarrowerRelations = (csid, relations) => {
  if (!relations) {
    return Immutable.List();
  }

  const objectCsid = csid || placeholderCsid;

  return relations.filter(
    (relation) => (relation.get('predicate') === '')
      || (
        relation.get('predicate') === 'hasBroader'
        && relation.getIn(['object', 'csid']) === objectCsid
      ),
  );
};
