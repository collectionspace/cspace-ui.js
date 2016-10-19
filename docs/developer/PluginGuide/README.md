# Plugin Guide

Plugins extend the functionality of the CollectionSpace UI. The cspace-ui project contains some standard built-in plugins in its source tree (in the plugins directory), but plugins may also be authored as separate projects, and distributed as separate npm packages that are configured into the UI at runtime.

## API

A plugin is a JavaScript module whose default export is a configuration function:

```JavaScript
(config: Object) => (pluginContext: Object) => Object
```

This function accepts a single argument, a configuration object, whose shape is determined by the plugin author. Depending on the type of plugin, there may be some standard configuration options that should be supported. See the documentation for individual [plugin types](#plugin-types) for details. 

The return value of the configuration function is a factory function. The factory function accepts a single argument, a plugin context object. This context object is provided by the cspace-ui plugin framework, and contains information about the application instance in which the plugin is running. See the [context](#context) documentation for details.

The factory function returns an object representing an instance of the plugin. The shape of the object is determined by the plugin type. See the documentation for individual [plugin types](#plugin-types) for details.

Using ES2015 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), a very simple plugin implementation might look like this:

```JavaScript
export default config => pluginContext => ({
  // Define plugin properties here. The supplied config and pluginContext arguments may be used to
  // compute these properties.
});
```

### Context

The plugin context object provided to the factory function contains information about the runtime environment that may be useful to the plugin. This includes references to third-party libraries, like React, that have been imported by the application. The plugin itself should not import any external dependencies that are injected via the plugin context; instead, it should use the provided ones. The reason for this is that a plugin is designed to be able to be packaged and distributed separately from the cspace-ui application. In that case, any dependencies imported by the plugin that are also imported by cspace-ui (or another plugin) would be duplicated. This would unnecessarily increase the size of the plugin's distribution bundle, and could cause problems with libraries that do not expect to be loaded more than once (like React).

The following properties are available in the context:

|Property|Description|
|--------|-----------|
|`Immutable`|The [Immutable](http://facebook.github.io/immutable-js/) library. The plugin may use this library to work with record data, which is represented as an Immutable [Map](http://facebook.github.io/immutable-js/docs/#/Map).|
|`React`|The [React](https://facebook.github.io/react/) library. The plugin may use this library to render UI components, such as record editor forms.|

## Plugin Types

- [Record Type](RecordTypePlugins.md)
