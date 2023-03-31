import { render as reactRender } from 'react-dom';
import { act } from 'react-dom/test-utils';

export function render(element, container) {
  let resultTree;

  act(() => {
    resultTree = reactRender(element, container);
  });

  return resultTree;
}

export async function asyncRender(element, container) {
  let resultTree;

  await act(async () => {
    resultTree = render(element, container);
  });

  return resultTree;
}
