function tryQuery(element, queryString, name, resolve, reject, attempt) {
  if (attempt * 50 > 1000) {
    reject();
  }

  setTimeout(() => {
    const result = element.querySelector(queryString);
    if (result) {
      resolve(result);
    } else {
      tryQuery(element, queryString, name, resolve, reject, attempt + 1);
    }
  }, 50);
}

export default function query(element, queryString, name = 'default') {
  return new Promise((resolve, reject) => {
    tryQuery(element, queryString, name, resolve, reject, 0);
  });
}
