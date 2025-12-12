export const handleNumberInput = (value: string) => {
  // Replace comma with dot
  let sanitized = value.replace(',', '.');

  // If first char is a dot → prefix with "0"
  if (sanitized.startsWith('.')) {
    sanitized = '0' + sanitized;
  }

  // Keep only digits + dot
  sanitized = sanitized.replace(/[^0-9.]/g, '');

  // Prevent multiple dots
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts[1];
  }

  // Enforce max 2 decimals
  if (parts.length === 2) {
    parts[1] = parts[1].slice(0, 2);
    sanitized = parts[0] + '.' + parts[1];
  }

  // Prevent leading zeros unless "0."
  if (sanitized.startsWith('0') && !sanitized.startsWith('0.')) {
    sanitized = sanitized.replace(/^0+/, '');
    if (sanitized === '') sanitized = '0';
  }

  return sanitized;
};
