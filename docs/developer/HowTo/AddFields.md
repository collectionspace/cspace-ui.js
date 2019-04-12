# Adding new fields to a core record type

This guide describes how to add fields to a record type's *common* schema, which contains fields that are available by default to all profiles and tenants. New fields may be added to the common schema after they have been approved through the community approval process.

## Updating the source code

You should have a working CollectionSpace server [installed](https://wiki.collectionspace.org/display/DOC/Installing+on+Ubuntu+LTS). As part of the installation process, you will have cloned the [services](https://github.com/collectionspace/services) and [application](https://github.com/collectionspace/application) source code from GitHub.

First, ensure that you have the latest code from the master branch. Assuming your CollectionSpace source code is in a directory named `collectionspace-source`:

```bash
cd collectionspace-source
cd services
git checkout master
git pull
cd ../application
git checkout master
git pull
```

Build and deploy the source code.

```bash
cd ../services
mvn clean install -DskipTests
cd ../application
mvn clean install -DskipTests
cd ../services
ant undeploy deploy
```

Restart CollectionSpace, and ensure that it runs successfully.

## Adding fields to the schema

The CollectionSpace back-end must be configured to add the new fields to the common schema. This is done by editing XML files in application.

First, create a feature branch.

```bash
cd ../application
git checkout -b {branch-name}
```

In the `tomcat-main/src/main/resources/defaults` directory, locate the configuration file for the record type you're changing. If the record is an authority, the file will be named `base-authority-{record type}.xml`. If the record is a procedure, the file will be named `base-procedure-{record type}.xml`. For collection objects, the file is named `base-collectionobject.xml`.

Edit the XML for the record type, adding the new fields. Use the existing field configurations as examples:

Example|Note
-------|----
[String](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-procedure-conditioncheck.xml#L111)|
[Date](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-procedure-conditioncheck.xml#L110)|As of 5.0, `ui-type="date"` is not needed. Only `datatype="date"` is needed.
[Integer](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-procedure-objectexit.xml#L76)|As of 5.0, `ui-type="validated"` is not needed. Only `datatype="integer"` is needed.
[Float](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-procedure-acquisition.xml#L184)|As of 5.0, `ui-type="validated"` is not needed. Only `datatype="float"` is needed.
[Authority autocomplete](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-procedure-acquisition.xml#L185)|As of 5.0, vocabularies do not need to be specified in the `autocomplete` property. It is sufficient to use `autocomplete="true"`.
Static option list|As of 5.0, static option lists are configured just like string fields. Options are defined in the UI.
[Dynamic term list](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-procedure-acquisition.xml#L108)|As of 5.0, the vocabulary does not need to be specified in the `autocomplete` property. It is sufficient to use `autocomplete="true"`. However, `ui-type="enum"` is still required.
[Structured date](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-authority-material.xml#L80)|
[Repeating scalar](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-authority-material.xml#L74-L76)|By convention, the `id` of the `repeat` element is the plural of the `id` of the contained `field`.
[Repeating group](https://github.com/collectionspace/application/blob/5e6be926ef169426daa4038cf6499769532f9fb0/tomcat-main/src/main/resources/defaults/base-authority-material.xml#L85-L88)|By convention, the `id` of the `repeat` element is `{name}GroupList/{name}Group`.

Deploy the changes:

```bash
cd ../services/services/JaxRsServiceProvider
ant deploy_services_artifacts
```

Restart CollectionSpace, and ensure that it runs successfully. Use the [REST API](https://wiki.collectionspace.org/display/DOC/Common+Services+REST+API+documentation) to create and retrieve a record with the new fields. The new fields should be saved and retrieved successfully.

## Adding fields to the UI

Once the fields have been added to the schema, they can be added to the record editor forms in the user interface. To start, clone the [cspace-ui.js](https://github.com/collectionspace/cspace-ui.js) project from GitHub:

```bash
git clone https://github.com/collectionspace/cspace-ui.js
cd cspace-ui.js
npm install
```

Run the UI:

```bash
npm run devserver
```

Open http://localhost:8080 in a browser, and verify that you can log in to CollectionSpace. By default, the development UI connects to the CollectionSpace server at https://nightly.collectionspace.org. Since your schema changes have only been deployed to your local CollectionSpace server, you'll need to point the development UI to that server. Edit index.html, and change the `serverUrl` setting to point to your local server, e.g. to `'http://localhost:8180'`. Reload the page in the browser, log out, and verify that you're able to log in again.

Locate the field configuration file for the record type you're changing. This file is named `fields.js`, and is in the directory `src/plugins/recordTypes/{record type}`. Add configuration for the new fields, using the existing configuration as an example, and referring to the [field configuration documentation](../../configuration/FieldConfiguration.md). Be sure the names of the fields are identical to what was configured in the schema.

Locate the forms for the record, in the directory `src/plugins/recordTypes/{record type}/forms`. Every record type has at least a default form (`default.jsx`). Some record types have alternate forms. Edit the jsx files of the forms on which the new fields should appear. Use the existing forms as examples, and refer to the [form configuration documentation](../../configuration/FormConfiguration.md).

The browser will automatically reload the UI as files are edited and saved. Verify that no JavaScript errors appear in the browser's console, that the new fields appear correctly on forms, and that they are able to be saved successfully.
