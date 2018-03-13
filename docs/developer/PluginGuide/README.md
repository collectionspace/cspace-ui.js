# Plugin Guide

This documentation is intended for developers who wish to author CollectionSpace UI plugins. For instructions on using an existing plugin, see the [configuration documentation](../../configuration).

Plugins modify or extend the functionality of the CollectionSpace UI by supplying configuration to be merged into the UI configuration. The cspace-ui project contains built-in plugins in its source tree (in the [src/plugins](../../../src/plugins) directory). These plugins are loaded by default. Plugins may also be authored as separate projects, and distributed as npm packages that are configured into the UI by the CollectionSpace administrator.

## Plugin API

A plugin is a JavaScript module whose default export is a factory function, with two possible return types.

```JavaScript
(config: Object) => Object
(config: Object) => (pluginContext: Object) => Object
```

The plugin factory function accepts a configuration object, whose shape is determined by the plugin author. The purpose of the configuration object is to modify the behavior the plugin, but the plugin author determines exactly how the configuration object is used.

The function has two possible return values: an object, or a function. If an object is returned, it must be a [CollectionSpace UI configuration object](../../configuration). If a function is returned, it will be executed with a plugin context object as its argument, and it must return a [CollectionSpace UI configuration object](../../configuration). Simple plugins may be implemented by simply returing an object, but having access to the plugin context allows the plugin to implement more complex configurations. In either case, the plugin's configuration contribution will be deeply merged into the pre-existing UI configuration.

Using an ES2015 [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and the ES2015 [export statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), a simple plugin that returns an object might look like this:

```JavaScript
export default config => ({
  // Define configuration properties here. The supplied config may be used to compute these properties.
});
```

A simple plugin that returns a function might look like this:

```JavaScript
export default config => pluginContext => ({
  // Define configuration properties here. The supplied config and pluginContext arguments may be used to
  // compute these properties.
});
```

### Plugin Context

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

