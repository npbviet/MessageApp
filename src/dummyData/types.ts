export type Message = {
  id: number;
  author: string;
  recipients: string;
  content: string;
  createdAt: number;
};

export type LoadState = "loading" | "ready" | "empty" | "error";

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    author: "Emily Chen",
    recipients: "Michael Brown",
    content: "Your appointment is confirmed for next Tuesday at 10:00 AM.",
    createdAt: new Date("2026-01-05T10:15:00").getTime(),
  },
  {
    id: 2,
    author: "David Johnson, Jr.",
    recipients: "Emily Davis",
    content: "Thank you for the confirmation. I will be there on time.",
    createdAt: new Date("2026-01-05T09:45:00").getTime(),
  },
  {
    id: 3,
    author: "System",
    recipients: "Thommas Harris",
    content:
      "Reminder: Please join a few minutes early to test your connection.",
    createdAt: new Date("2026-01-04T17:30:00").getTime(),
  },
];

export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}
