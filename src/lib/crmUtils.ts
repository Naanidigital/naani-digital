/**
 * CRM Helper Utilities for WhatsApp Numbers, Date Formatting and Badges
 */

export function formatPhone(waId: string | null | undefined): string {
  if (!waId) return "Unknown";
  const clean = waId.replace(/[^0-9]/g, "");
  if (clean.length === 12 && clean.startsWith("91")) {
    return `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return clean ? `+${clean}` : "Unknown";
}

export function formatMessageTime(isoString: string | null | undefined): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
  } catch {
    return "";
  }
}

export function formatConversationDate(isoString: string | null | undefined): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.round((today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
    }
    if (diffDays === 1) {
      return "Yesterday";
    }
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    }
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { day: "numeric", month: "short" });
    }
    return date.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export function getMessageDateDivider(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.round((today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { day: "numeric", month: "long" });
    }
    return date.toLocaleDateString([], { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}
