# Contributing Code

Contribute bug fixes and new features by submitting pull requests on GitHub.

Ensure that [`npm run check`](BuildScripts.md#check) succeeds. When a pull request is created, a build of the source branch will automatically run in the continuous integration environment (Travis CI). To be accepted, pull requests must pass `check` in CI.

Write tests for the changes. [`npm run check`](BuildScripts.md#check) (or [`npm run test`](BuildScripts.md#test)/[`npm run start`](BuildScripts.md#start) followed by [`npm run coverage`](BuildScripts.md#coverage)) will report code that is not covered by tests. To be accepted, a pull request must not decrease coverage by more than 5%, or to below 90%.

Follow the coding practices from the [Airbnb style guide](https://github.com/airbnb/javascript). [`npm run lint`](BuildScripts.md#lint) will enforce many of the rules. The rules should be followed even when they are not enforced by the linter.
