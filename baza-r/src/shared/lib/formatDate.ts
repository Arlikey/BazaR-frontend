export function formatReviewDate(date: string) {
  return new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
