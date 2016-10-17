/* global document */

export default function createTestContainer(context) {
  const titles = [];

  let current = context.currentTest;

  while (current) {
    titles.push(current.title);

    current = current.parent;
  }

  const title = document.createElement('p');
  title.textContent = titles.reverse().join(' ');

  const container = document.createElement('div');

  document.body.appendChild(title);
  document.body.appendChild(container);

  return container;
}
