export const handleNumberInput = (value: string) => {
  // Replace comma with dot
  let sanitized = value.replace(',', '.');

  // Remove all invalid characters except digits and dot
  sanitized = sanitized.replace(/[^0-9.]/g, '');

  // Prevent multiple dots
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts[1];
  }

  // Prevent leading zeros unless it's "0."
  if (sanitized.startsWith('0') && !sanitized.startsWith('0.')) {
    sanitized = sanitized.replace(/^0+/, '');
    if (sanitized === '') sanitized = '0';
  }

  return sanitized;
};
