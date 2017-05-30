# Plugin Guide

Plugins modify or extend the functionality of the CollectionSpace UI by supplying configuration options to be merged into the configuration of the UI. The cspace-ui project contains built-in plugins in its source tree (in the [src/plugins](../../../src/plugins) directory), but plugins may also be authored as separate projects, and distributed as npm packages that are configured into the UI at runtime.

## API

A plugin is a JavaScript module whose default export is a factory function, with two possible return types.

```JavaScript
(config: Object) => Object
(config: Object) => (pluginContext: Object) => Object
```

The factory function accepts a configuration object, whose shape is determined by the plugin author. The purpose of the configuration object is to modify the behavior the plugin, but the plugin author determines exactly how the configuration object is used.

The factory function has two possible return values: an object, or a function. If an object is returned, it must be a [CollectionSpace UI configuration object](../../configuration). If a function is returned, it will be executed with a plugin context object, and it must return a CollectionSpace UI configuration object. The plugin's configuration contribution is merged into the UI configuration.

Using ES2015 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), a simple plugin implementation might look like this:

```JavaScript
export default config => pluginContext => ({
  // Define configuration properties here. The supplied config and pluginContext arguments may be used to
  // compute these properties.
});
```

### Plugin Context

The context object provided to the plugin function contains information about the runtime environment that may be useful to the plugin. This includes references to third-party libraries, like React, that have been imported by the application. The plugin itself should not import any external dependencies that are injected via the context; instead, it should use the provided ones. The reason for this is that a plugin is designed to be able to be packaged and distributed separately from the cspace-ui application. In that case, any dependencies imported by the plugin that are also imported by cspace-ui (or another plugin) would be duplicated. This would unnecessarily increase the size of the plugin's distribution bundle, and could cause problems with libraries that do not expect to be loaded more than once (like React).

The following properties are available in the context:

#### `lib`: Object

An object that contains external libraries. The following properties are available.

|Property   |Description|
|-----------|-----------|
|`Immutable`|The [Immutable](http://facebook.github.io/immutable-js/) library. The plugin may use this library to work with record data, which is represented as an Immutable [Map](http://facebook.github.io/immutable-js/docs/#/Map).|
|`React`    |The [React](https://facebook.github.io/react/) library. The plugin may use this library to render UI components, such as record editor forms.|

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

