export default function throwAxeViolationsError(violations) {
  const violationMessages = violations.map(
    (violation) => `${violation.id}: ${violation.description} (${violation.nodes.length} nodes)`,
  ).join('\n');
  throw new Error(`Accessibility violations found:\n${violationMessages}`);
}
