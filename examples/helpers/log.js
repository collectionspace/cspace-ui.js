import util from 'util';

export default function log(message, object) {
  // eslint-disable-next-line no-console
  console.log(message);

  if (typeof object !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log(util.inspect(object, {
      depth: 6,
      colors: true,
    }));
  }

  return object;
}
