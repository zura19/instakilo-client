import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showMoreText(
  text: string,
  showMore: boolean = false,
  maxLength: number = 100
): string {
  if (text.length <= maxLength) return text;

  if (showMore) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
}

export function timeAgo(pastDateString: string) {
  const now = new Date();
  const past = new Date(pastDateString);
  // @ts-expect-error Type 'Date' is not assignable to type 'number'.
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // base64 with mime type
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
