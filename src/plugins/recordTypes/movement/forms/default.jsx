import { defineMessages } from 'react-intl';

const template = (configContext) => {
  const {
    React,
  } = configContext.lib;

  const {
    Col,
    Cols,
    Panel,
    Row,
  } = configContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = configContext.recordComponents;

  return (
    <Field name="document">
      <Panel name="location" collapsible>
        <Row>
          <Field name="movementReferenceNumber" />
          <Field name="normalLocation" />
        </Row>

        <InputTable name="currentLocation">
          <Field name="currentLocation" />
          <Field name="currentLocationFitness" />
          <Field name="currentLocationNote" />
        </InputTable>

        <Cols>
          <Col>
            <Field name="locationDate" />
          </Col>

          <Col />
        </Cols>
      </Panel>

      <Panel name="movement" collapsible collapsed>
        <Cols>
          <Col>
            <Field name="reasonForMove" />

            <Field name="movementMethods">
              <Field name="movementMethod" />
            </Field>

            <Row>
              <Field name="plannedRemovalDate" />
              <Field name="removalDate" />
            </Row>
          </Col>

          <Col>
            <Field name="movementContact" />
            <Field name="movementNote" />
          </Col>
        </Cols>
      </Panel>

      <Panel name="inventory" collapsible collapsed>
        <Cols>
          <Col>
            <Field name="inventoryActionRequired" />
            <Field name="frequencyForInventory" />

            <Row>
              <Field name="inventoryDate" />
              <Field name="nextInventoryDate" />
            </Row>
          </Col>

          <Col>
            <Field name="inventoryContactList">
              <Field name="inventoryContact" />
            </Field>

            <Field name="inventoryNote" />
          </Col>
        </Cols>
      </Panel>
    </Field>
  );
};

export default (configContext) => ({
  messages: defineMessages({
    name: {
      id: 'form.movement.default.name',
      defaultMessage: 'Standard Template',
    },
  }),
  template: template(configContext),
});
