function tryQuery(element, queryString, name, resolve, reject, attempt) {
  if (attempt * 50 > 1000) {
    reject();
  }

  setTimeout(() => {
    console.log(`${name} query #${attempt} for ${queryString}`);
    const result = element.querySelector(queryString);
    if (result) {
      console.log(`found it ${result}`);
      resolve(result);
    } else {
      // console.log(`is null ? ${result}`);
      tryQuery(element, queryString, name, resolve, reject, attempt + 1);
    }
  }, 50);
}

export default function query(element, queryString, name = 'default') {
  return new Promise((resolve, reject) => {
    tryQuery(element, queryString, name, resolve, reject, 0);
  });
}
