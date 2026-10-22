// Only allow same-site relative paths as a post-login redirect target (blocks open redirects like //evil.com).
export function safeNext(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.startsWith("/") && !v.startsWith("//") ? v : "/";
}
