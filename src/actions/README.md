# Redux Actions

This directory contains definitions of [Redux](http://redux.js.org) [action](http://redux.js.org/docs/basics/Actions.html) [creators](http://redux.js.org/docs/basics/Actions.html#action-creators). You should have a good understanding of Redux before making modifications to these files.

The actions dispatched in the cspace-ui application are divided into functionally related groups. Each group of action creators is defined in a separate file. All of the actions are [Flux Standard Actions](https://github.com/acdlite/flux-standard-action), and action type constants are defined in the files where they are used.

## Synchronous Actions

Some action creators are synchronous, resulting in immediate state updates when dispatched. A synchronous action creator is recognizable by its single [fat-arrow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) signature, defining a function that returns an action object:

```
export const resetLogin = () => ({
  type: RESET_LOGIN,
});
```

The function may have different numbers and types of arguments, depending on the action being created.

## Asynchronous Actions

Some action creators perform asynchronous side-effects, such as making a request to the CollectionSpace REST API. These are implemented as [async action creators](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators) that pass through the [Redux Thunk](https://github.com/gaearon/redux-thunk) middleware. An async action creator is recognizable by its double [fat-arrow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) signature, which defines a function that returns a function that takes a dispatch argument:

```
export const readRecord = (serviceConfig, csid) => (dispatch) => {
  ...
};
```

The function may have different numbers and types of arguments, depending on the action being created. Occasionally the returned function will take multiple arguments, but the first will always be `dispatch`. See the [Redux Thunk](https://github.com/gaearon/redux-thunk) documentation for details.
