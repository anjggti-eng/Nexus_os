import { randomUUID as uuid } from "crypto";

export function generateId(): string {
  return uuid();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function maskPhone(phone: string): string {
  if (phone.length < 4) return phone;
  return phone.slice(0, 2) + "****" + phone.slice(-4);
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  return name.slice(0, 2) + "****@" + domain;
}

export function parseNumber(value: string): number | null {
  const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delayMs: number
): Promise<T> {
  return fn().catch(async (err) => {
    if (maxAttempts <= 1) throw err;
    await new Promise((r) => setTimeout(r, delayMs));
    return retry(fn, maxAttempts - 1, delayMs);
  });
}
