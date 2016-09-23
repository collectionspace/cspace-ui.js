import React from 'react';

import {
  InputGroup as Group,
  TextInput as Text,
} from 'cspace-input';

export default (
  <Group defaultPath="ns2:collectionobjects_common">
    <Text name="objectNumber" />
    <Text name="numberOfObjects" />
    <Group name="otherNumberList">
      <Group name="otherNumber" tabular repeating>
        <Text name="numberType" />
        <Text name="numberValue" />
      </Group>
    </Group>
    <Group name="responsibleDepartments">
      <Text name="responsibleDepartment" repeating />
    </Group>
    <Text name="collection" />
    <Text name="recordStatus" />
    <Group name="briefDescriptions">
      <Text name="briefDescription" multiline repeating />
    </Group>
    <Text name="distinguishingFeatures" multiline />
    <Group name="comments">
      <Text name="comment" multiline repeating />
    </Group>
    <Text name="computedCurrentLocation" />
  </Group>
);
