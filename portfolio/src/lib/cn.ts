export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function toUrl(url: string): string {
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}
