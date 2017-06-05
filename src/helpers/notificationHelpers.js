let nextID = 0;

export default () => {
  nextID += 1;

  return nextID.toString();
};
