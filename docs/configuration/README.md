# Configuration

## Configuration Object

The CollectionSpace UI is configured by passing a configuration object to the `cspaceUI` function, as in the following example:

```JavaScript
cspaceUI({
  basename: '/mymuseum',
  serverUrl: 'https://nightly.collectionspace.org',
  messages: {
    'about.title': 'Welcome to My Museum CollectionSpace',
  },
});
```

## Configurer Function

Alternatively, a configurer function may be passed to `cspaceUI` instead of an object. The configurer function will be called by the cspace-ui framework at initialization time, and it should return a configuration object. The function will receive one parameter: a [configuration context](./ConfigurationContext.md) object that contains information about the runtime environment, and provides access to cspace-ui APIs. This allows for more complex configurations.

For example:

```JavaScript
cspaceUI((configContext) => {
  // Can access configContext here.

  return {
    basename: '/mymuseum',
    serverUrl: 'https://nightly.collectionspace.org',
    messages: {
      'about.title': 'Welcome to My Museum CollectionSpace',
    },
  };
});
```

## Using Plugins

The CollectionSpace UI may be configured to use plugins. Plugins are modules that provide configuration settings.

ℹ️ In a standard CollectionSpace server installation, plugins are placed in the `webapps/cspace-ui` folder under tomcat.

To use a plugin, first load its JavaScript file into the HTML page that contains the CollectionSpace UI using a `<script>` tag. The plugin exports a JavaScript function (see the documentation for the plugin for the name of the function). Add a call to the function to the `plugins` configuration property.

For example:

```HTML
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <!-- Define a container element -->
    <div id="cspace"></div>

    <!-- Load the CollectionSpace UI -->
    <script src="http://unpkg.com/cspace-ui@1.0.0/dist/cspaceUI.min.js"></script>

    <!-- Load the plugin that provides configuration for the public art profile -->
    <script src="http://unpkg.com/cspace-ui-plugin-profile-publicart@1.0.0/dist/cspaceUI.min.js"></script>

    <!-- Initialize and configure the CollectionSpace UI -->
    <script>
      cspaceUI({
        plugins: [
          // Initialize the public art profile plugin
          cspaceUIPluginProfilePublicArt(),
        ],
      });
    </script>
  </body>
</html>
```

Instructions on [creating a plugin](../developer/Plugins.md) may be found in the developer documentation.

## Configuration Merging

The configuration object passed to `cspaceUI` (the *source* configuration) is merged into the application's default configuration (the *target* configuration). This allows the default value of any configuration property to be overridden.

A source configuration is merged into a target configuration as follows: First, if any plugins are loaded by the source configuration (via the [`plugins`](#plugins) property), each plugin is applied to the target configuration in order. The configuration from the first plugin is merged into the target configuration, then the next plugin modifies that modified configuration, and so on, until all plugins have been applied. Finally, the remaining source configuration options are deeply merged into the resulting plugin-modified target configuration. Any properties that are present in the source configuration will override properties with the same key in the target configuration.

## Configuration Property Reference

The configuration object may contain the following properties.

```
{property name}: {type} = {default value}
```

### allowDeleteHierarchyLeaves
```
allowDeleteHierarchyLeaves: boolean = false
```
When false (the default), records belonging to a hierarchy (those with broader or narrower records) may not be deleted. If true, leaf records in a hierarchy (records with a broader relation, but no narrower relations) are allowed to be deleted.

### autocompleteFindDelay
```
autocompleteFindDelay: number = 500
```
The number of milliseconds to wait before initiating a partial term search in an autocomplete input field, once the partial term value changes (e.g., from the user typing). This delay is used to debounce requests to the server while the user is still typing.

### autocompleteMinLength
```
autocompleteMinLength: number = 3
```
The minimum number of characters required in an autocomplete input field in order for a partial term search to be initiated. This is used to prevent partial term searches that would return an overwhelming number of results, which could impact system performance.

### basename
```
basename: string = ''
```
The path on the web server where the UI is located. For example, if the HTML page containing the UI is published to http://somehost.com/cspace, `basename` should be set to `'/cspace'`.

### container
```
container: string = '#cspace'
```
The [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) used to locate the container element into which the UI will be rendered. If the selector matches more than one element, the first is used. The content of the container element will be overwritten.

### defaultAdvancedSearchBooleanOp
```
defaultAdvancedSearchBooleanOp: string = 'or'
```
The default boolean operator to use on advanced search forms, either `'and'` or `'or'`. Once the user makes a selection that changes the boolean operator, that selection is stored in the browser as a user preference. This default will only apply if there is no existing user preference.

### defaultDropdownFilter
```
defaultDropdownFilter: string = 'substring'
```
Determines the default algorithm to use for filtering options in dropdown lists as the user types. The value may either be `'prefix'` or `'substring'`. If the value is `'prefix'`, filtered options must start with the value typed by the user. Otherwise, filtered options may contain the value typed by the user, anywhere in the string. The default filtering algorithm may be overridden for any individual field in [field configuration](./FieldConfiguration.md), by supplying the `filter` prop in the field's view configuration.

### defaultSearchPageSize
```
defaultSearchPageSize: number = 20
```
The default page size for search results presented as the main content of a page, for example, on Search.

### defaultSearchPanelSize
```
defaultSearchPanelSize: number = 5
```
The default page size for search results presented in a panel, for example, in a sidebar.

### idGeneratorTransform
```
idGeneratorTransform: (string) => string = undefined
```
A function to transform ID numbers generated by ID generator inputs. If supplied, this function is applied to the value returned by the REST API when a new number is requested.

### locale
```
locale: string = 'en-US'
```
The locale to use for formatting numbers, dates, and currency. Also used to determine the first day of the week in the date picker (calendar) input.

### logo
```
logo: string = defaultLogoUrl
```
URL to the logo image for the application, displayed in the upper left corner of each screen. By default, the bundled CollectionSpace logo is used. Any URL allowed in the `src` attribute of the HTML [`img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag may be specified, including relative URLS, `http` URLs, and [`data` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

### mediaSnapshotSort
```
mediaSnapshotSort: string = 'title'
```
The name of the column to use to sort images in the Media Snapshot panel (displayed in the right sidebar of object and procedure records). The value must be the name of a configured column in the media record's default [column set](./ColumnConfiguration.md). By default, the possible values are: `'blobCsid'`, `'identificationNumber'`, `'title'`, `'updatedAt'`. Other values may be possible if the media record's column configuration has been modified. A descending sort order may be specified by appending `desc` to the column name, for example, `'title desc'`.

### messages
```
messages: { [id: string]: string } = undefined
```
An object containing messages to use to override the default messages. These may be translations, or any other customization. The keys are message IDs, and the values are strings to be displayed. For example:

```JavaScript
cspaceUI({
  messages: {
    // Override the login page title
    'about.title': 'My Museum CollectionSpace',

    // Override the label of the editionNumber field
    'field.collectionobjects_common.editionNumber.name': 'Ed. no.',

    // Override the label of the cubic-centimeters option
    'option.measurementUnits.cubic-centimeters': 'cm³',
  },
});
```

See the [messages reference](./messages.js) for the IDs and default values of all messages in the application.

### optionLists
```
optionLists: OptionListMap = defaultOptionLists
```
An object containing definitions of option lists, which are used to populate dropdowns. See the [option list configuration](./OptionListConfiguration.md) documentation for details. All option lists required by the core application are defined by default.

### plugins
```
plugins: Array<Plugin> = defaultPlugins
```
An array of plugins to be loaded. Plugins are modules that customize the UI. A number of plugins are packaged with cspace-ui, and are loaded by default, including ones that implement the core record types and configure the default option lists.

### prettyUrls
```
prettyUrls: boolean = false
```
When `prettyUrls` is false (the default), the URLs of pages in the UI contain `#` and a generated hash string. For example, if the HTML page containing the UI is published to http://somehost.com/cspace, the URL of the Create New page would look something like http://somehost.com/cspace/#/create?_k=xu2oud. To make the URLs prettier, e.g. http://somehost.com/cspace/create, the web server must be configured so that any requests to http://somehost.com/cspace/** that are not found will fall back to the page at http://somehost.com/cspace. In apache, this may be done using the [`FallbackResource`](https://httpd.apache.org/docs/current/mod/mod_dir.html#fallbackresource) directive. Once the web server is configured with fallback support, `prettyUrls` may be set to true.

⚠️ Some CollectionSpace features do not work correctly when `prettyUrls` is set to `false`. This setting is intended only to get the UI up and running quickly. Before doing a full evaluation or running the UI in production, the web server should be configured with fallback support, and `prettyUrls` should be set to `true`.

ℹ️ In a standard CollectionSpace server installation, the UI for each tenant is configured with `prettyUrls` set to `true`. A servlet filter with the class `org.collectionspace.services.common.filter.FallbackResourceFilter` is provided to implement the fallback behavior in Tomcat.

### recordTypes
```
recordTypes: RecordTypeMap = defaultRecordTypes
```
An object containing definitions of the record types that are known to the UI. See the [record type configuration](./RecordTypeConfiguration.md) documentation for details. All record types required by the core application are defined by default.

### relationMemberPerm
```
relationMemberPerm: string = 'U'
```
The permission required on a record in order to create or delete a relation that has the record as a member (subject or object). This permission is required in addition to create/delete permission on the relation record itself. The value must be one of the following: `L` (list), `R` (read), `C` (create), `U` (update), `D` (delete).

⚠️ This property only affects the controls that are enabled in the user interface. It does not affect the permissions required to create or delete a relation via the services layer REST API, which only considers permissions on relation records, not permissions on the member records.

### serverUrl
```
serverUrl: string = ''
```
The URL of the CollectionSpace services layer REST API. This should include the protocol, host, and port (if not 80), for example: `'http://demo.collectionspace.org:8180'` or `'https://nightly.collectionspace.org'`. If `serverUrl` is empty or unspecified, the REST API is assumed to be accessible at the same protocol, host, and port from which the HTML page containing the UI was retrieved. If the UI is served from a different host than the REST API, the services layer must be [configured to accept CORS requests](https://wiki.collectionspace.org/x/9gHPCQ#NewServicesLayerFeatures:JSON,OAuth2,andCORS-CORS) from the origin of the UI.

⚠️ Do not include the `/cspace-services` path in the `serverUrl` string.

### showTermListStateIcon
```
showTermListStateIcon: boolean = false
```
If true, show a column in the term editing table (on the Term Lists tab of the Administration screen) that contains icons indicating the workflow state of the term.

### tenantId
```
tenantId: string = '1'
```
The ID of the tenant to access on the CollectionSpace server, normally a numeric string. The default value '1' corresponds to the core (default) CollectionSpace tenant. If this value is not set correctly, logins will fail with a message stating that the user is not registered to the expected tenant.

### termDeprecationEnabled
```
termDeprecationEnabled: boolean = false
```
If true, show deprecation buttons (Activate/Deactivate) on authority item record editors.
