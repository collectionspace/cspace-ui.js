# Configuration

The CollectionSpace UI is configured by passing a configuration object to the `cspaceUI` function.

## Merging

A source configuration object is merged into a target configuration as follows: First, any plugins specified in the source configuration under the `plugins` key are applied in order. The first plugin amends or overrides the target configuration, then the next plugin modifies that modified configuration, and so on, until all plugins have been applied. Finally, the remaining source configuration options are merged into the resulting plugin-modified configuration.

## Properties

The configuration object may contain the following properties.

#### `basename`: String
The base path at which the UI is located. For example, if the HTML page containing the UI is published to http://somehost.com/cspace, basename should be set to `'/cspace'`.
Default: `''`

#### `container`: String
The CSS selector used to locate the container element into which the UI will be rendered. If the selector matches more than one element, the first is used.
Default: `'main'`

#### `serverUrl`: String
The URL of the CollectionSpace REST API server. This should include the protocol, host, and port (if not 80), for example: 'http://demo.collectionspace.org:8180'. If empty, the REST API is assumed to be located at the same protocol/host/port from which the HTML page containing the UI was retrieved. If the UI is served from a different host than the REST API, the services layer will have to be configured to accept CORS requests from the origin of the UI.
Default: `''`

#### `locale`: String
The locale used for formatting numbers, dates, and currency.
Default: `'en'`

#### `messages`: Object
An object containing translated messages. The property names are message ids, and the values are the strings to be displayed. [TODO: Generate docs of all message ids and descriptions.]
Default: `undefined`

#### `plugins`: Array
An array of plugins to be loaded. Plugins are loaded in the order specified. [TODO: Add more info.]

#### `prettyUrls`: boolean
By default, the URLs of pages in the UI contain `#` and a generated hash string. For example, if the HTML page containing the UI is published to http://somehost.com/cspace, the URL of the Create New page would look like http://somehost.com/cspace/#/create?_k=xu2oud. To make the URLs prettier, e.g. http://somehost.com/cspace/create, the web server must be configured so that any requests to http://somehost.com/cspace/** that are not found will fall back to the page at http://somehost.com/cspace. In apache, the `FallbackResource` directive does this. Once the web server is configured with fallback support, `prettyUrls` may be set to true.
Default: `false`
