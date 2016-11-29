# Plugin Guide

Plugins modify or extend the functionality of the CollectionSpace UI by supplying configuration options to be merged into the configuration of the UI. The cspace-ui project contains some standard built-in plugins in its source tree (in the plugins directory), but plugins may also be authored as separate projects, and distributed as separate npm packages that are configured into the UI at runtime.

## API

A plugin is a JavaScript module whose default export is a factory function. 

```JavaScript
(config: Object) => Object
(config: Object) => (context: Object) => Object
```

The factory function accepts a configuration object, whose shape is determined by the plugin author. The purpose of the configuration object is to configure the plugin. The plugin author determines how the configuration object is used.

The factory function has two possible return values: an object, or a function. If an object is returned, it must be a [CollectionSpace UI configuration object](../../configuration), which will be merged into the current UI configuration. If a function is returned, it will be executed with a context object, and it must return a CollectionSpace UI configuration object to be merged into the current UI configuration.

Using ES2015 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), a simple plugin implementation might look like this:

```JavaScript
export default config => context => ({
  // Define configuration properties here. The supplied config and context arguments may be used to
  // compute these properties.
});
```

### Context

The context object provided to the plugin function contains information about the runtime environment that may be useful to the plugin. This includes references to third-party libraries, like React, that have been imported by the application. The plugin itself should not import any external dependencies that are injected via the context; instead, it should use the provided ones. The reason for this is that a plugin is designed to be able to be packaged and distributed separately from the cspace-ui application. In that case, any dependencies imported by the plugin that are also imported by cspace-ui (or another plugin) would be duplicated. This would unnecessarily increase the size of the plugin's distribution bundle, and could cause problems with libraries that do not expect to be loaded more than once (like React).

The following properties are available in the context:

|Property|Description|
|--------|-----------|
|`Immutable`|The [Immutable](http://facebook.github.io/immutable-js/) library. The plugin may use this library to work with record data, which is represented as an Immutable [Map](http://facebook.github.io/immutable-js/docs/#/Map).|
|`React`|The [React](https://facebook.github.io/react/) library. The plugin may use this library to render UI components, such as record editor forms.|
