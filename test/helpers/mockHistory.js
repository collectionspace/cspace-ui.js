export default function mockHistory(properties) {
  const history = {
    push: () => null,
    replace: () => null,
    go: () => null,
    goBack: () => null,
    goForward: () => null,
  };

  Object.assign(history, properties);

  return history;
}
