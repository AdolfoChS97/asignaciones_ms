export function checkProperties(obj) {
  const properties = {};
  if (typeof obj !== 'object') return {};
  if (Array.isArray(obj)) return {};
  if (Object.keys(obj).length === 0) return {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      properties[key] = value;
    }
  }
  return properties;
}
