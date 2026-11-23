import '../css/custom.css';

/**
 * SeverityChip: a small colored label for a message's severity, styled like an app badge.
 *
 *   <SeverityChip>Warning</SeverityChip>
 *   <SeverityChip level="error">Error</SeverityChip>
 *
 * `level` is worked out from the text when omitted: "Error" -> error, "Warning" -> warning,
 * "Required input" / "Required" -> required, anything else -> info.
 * In TableVertical, colFormat={['severity', ...]} applies this to every cell of a column.
 */
export function severityLevel(text) {
  const t = String(text || '')
    .trim()
    .toLowerCase();
  if (t.startsWith('error')) return 'error';
  if (t.startsWith('warn')) return 'warning';
  if (t.startsWith('required')) return 'required';
  return 'info';
}

const SeverityChip = ({ level, children }) => {
  const lvl = level || severityLevel(typeof children === 'string' ? children : '');
  return <span className={`ui-severity ui-severity--${lvl}`}>{children}</span>;
};

export default SeverityChip;
