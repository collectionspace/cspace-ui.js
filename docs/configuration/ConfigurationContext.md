### Config Context

The context object provided to the plugin's factory function contains information about the runtime environment that may be useful to the plugin. This includes references to third-party libraries, like React and Immutable, that have been imported by the application. The plugin itself should not import any external dependencies that are injected via the context; instead, it should use the provided ones. The reason for this is that a plugin may be packaged and distributed separately from the cspace-ui application. In that case, any dependencies imported by the plugin that are also imported by cspace-ui (or another plugin) would be duplicated. This would unnecessarily increase the size of the plugin's distribution bundle, and could cause problems with libraries that do not expect to be loaded more than once (like React).

The following properties are available in the context:

#### `lib`: Object

An object that contains external libraries. The following properties are available.

|Property   |Description|
|-----------|-----------|
|`Immutable`|The [Immutable](http://facebook.github.io/immutable-js/) library. The plugin may use this library to work with record data, which is represented as an Immutable [Map](http://facebook.github.io/immutable-js/docs/#/Map).|
|`React`    |The [React](https://facebook.github.io/react/) library. The plugin may use this library to render UI components, such as record forms.|


#### `inputComponents`: Object

An object that contains React input components for use in forms. The following properties are available.

|Property                   |Description|
|---------------------------|-----------|
|`AuthorityControlledInput` ||
|`CompoundInput`            ||
|`DateInput`                ||
|`IDGeneratorInput`         ||
|`OptionControlledInput`    ||
|`StructuredDateInput`      ||
|`TextInput`                ||
|`VocabularyControlledInput`||

#### `layoutComponents`: Object

An object that contains React layout components for use in forms. The following properties are available.

|Property|Description|
|--------|-----------|
|`Panel` ||
|`Row`   ||

#### `recordDataHelpers`: Object

An object that contains functions for working with record data.

|Property             |Description|
|---------------------|-----------|
|`deepGet`            ||
|`getPart`            ||
|`getPartPropertyName`||

#### `refNameHelpers`: Object

An object that contains functions for working with refnames.

|Property         |Description|
|-----------------|-----------|
|`getDisplayName` ||

