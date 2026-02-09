export function reflect(message) {
  const lower = message.toLowerCase();

  if (lower.startsWith("i want")) {
    return `Goal detected: ${message}`;
  }

  if (lower.startsWith("i hate")) {
    return `Aversion detected: ${message}`;
  }

  if (lower.includes("remember this")) {
    return `Explicit memory request: ${message}`;
  }

  return null;
}
