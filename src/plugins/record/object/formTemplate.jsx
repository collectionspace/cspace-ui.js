import React from 'react';

import {
  CompoundInput as Group,
  TextInput as Text,
} from 'cspace-input';

import Panel from '../../../components/layout/Panel';
import Row from '../../../components/layout/Row';

import { getPartPropertyName } from '../../../helpers/recordDataHelpers';

export default (
  <Group defaultChildSubpath={getPartPropertyName('collectionobjects_common')}>
    <Panel name="idPanel" collapsible>
      <Row>
        <div>
          <Text name="objectNumber" />
          <Text name="numberOfObjects" />
          <Group name="otherNumberList">
            <Group name="otherNumber" tabular repeating>
              <Text name="numberValue" />
              <Text name="numberType" />
            </Group>
          </Group>
          <Group name="responsibleDepartments">
            <Text name="responsibleDepartment" repeating />
          </Group>
          <Text name="collection" />
          <Text name="recordStatus" />
        </div>
        <div>
          <Group name="briefDescriptions">
            <Text name="briefDescription" multiline repeating />
          </Group>
          <Text name="distinguishingFeatures" multiline />
          <Group name="comments">
            <Text name="comment" multiline repeating />
          </Group>
        </div>
      </Row>

      <Text name="computedCurrentLocation" />

      <Group name="titleGroupList">
        <Group name="titleGroup" repeating>
          <Panel>
            <Row>
              <div>
                <Text name="title" />
                <Text name="titleLanguage" />
              </div>
              <div>
                <Text name="titleType" />
                <Group name="titleTranslationSubGroupList">
                  <Group name="titleTranslationSubGroup" tabular repeating>
                    <Text name="titleTranslation" />
                    <Text name="titleTranslationLanguage" />
                  </Group>
                </Group>
              </div>
            </Row>
          </Panel>
        </Group>
      </Group>

      <Group name="objectNameList">
        <Group name="objectNameGroup" tabular repeating>
          <Text name="objectName" />
          <Text name="objectNameCurrency" />
          <Text name="objectNameLevel" />
          <Text name="objectNameSystem" />
          <Text name="objectNameType" />
          <Text name="objectNameLanguage" />
          <Text name="objectNameNote" />
        </Group>
      </Group>
    </Panel>

    <Panel name="descPanel" collapsible>
      <Panel name="contentPanel" collapsible />
      <Panel name="textInscriptPanel" collapsible />
      <Panel name="nonTextInscriptPanel" collapsible />
    </Panel>

    <Panel name="prodPanel" collapsible />

    <Panel name="histPanel" collapsible>
      <Panel name="assocPanel" collapsible />
    </Panel>

    <Panel name="ownerPanel" collapsible />

    <Panel name="viewerPanel" collapsible />

    <Panel name="referencePanel" collapsible />

    <Panel name="collectPanel" collapsible />
  </Group>
);
