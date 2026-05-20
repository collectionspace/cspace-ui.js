const sanitizeIdSegment = (segment) => String(segment).replace(/[^a-zA-Z0-9_-]/g, '_');

export default function buildInputId(recordType, formName, path) {
  const parts = ['cspace'];

  if (recordType) {
    parts.push(recordType);
  }

  if (formName) {
    parts.push(formName);
  }

  if (Array.isArray(path)) {
    path.forEach((part) => {
      if (part !== undefined && part !== null && part !== '') {
        parts.push(part);
      }
    });
  }

  return parts.map(sanitizeIdSegment).join('-');
}
