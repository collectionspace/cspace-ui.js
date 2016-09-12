export default function getFirst(possibleArray) {
  if (Array.isArray(possibleArray)) {
    return possibleArray[0];
  }

  return possibleArray;
}
