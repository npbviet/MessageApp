export function formatRelative(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const diffHours = Math.floor(
    (diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
  );

  if (diffDays <= 0 && diffHours <= 0) return "Just now";
  if (diffDays <= 0) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffHours === 0) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ${diffHours}h ago`;
}

