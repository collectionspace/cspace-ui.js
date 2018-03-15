# Record Service Configuration

Service layer properties for a record type or vocabulary may be configured by providing a service descriptor object in the `serviceConfig` configuration property.

```
type ServiceDescriptor = {
  serviceName: string,
  servicePath: string,
  serviceType: string,
  objectName: string,
  documentName: string,
};
```

## Example

```
cspaceUI({
  recordTypes: {
    collectionobject: {
      serviceConfig: {
        serviceName: 'CollectionObjects',
        servicePath: 'collectionobjects',
        serviceType: 'object',
        objectName: 'CollectionObject',
        documentName: 'collectionobjects',
      },
    },
    person: {
      serviceConfig: {
        serviceName: 'Persons',
        servicePath: 'personauthorities',
        serviceType: 'authority',
        objectName: 'Person',
        documentName: 'persons',
      },
      vocabularies: {
        local: {
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
        },
        ulan: {
          serviceConfig: {
            servicePath: 'urn:cspace:name(ulan_pa)',
          },
        },
      },
    },
  },
});
```

## Description

TK