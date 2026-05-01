export const PLURALS = {
  product: { one: "товар", few: "товари", many: "товарів" },
  review: { one: "відгук", few: "відгуки", many: "відгуків" },
} as const;

export function pluralize(
  count: number,
  forms: { one: string; few: string; many: string },
  locale = "uk",
) {
  const pr = new Intl.PluralRules(locale);
  const rule = pr.select(count);

  switch (rule) {
    case "one":
      return forms.one;
    case "few":
      return forms.few;
    default:
      return forms.many;
  }
}
