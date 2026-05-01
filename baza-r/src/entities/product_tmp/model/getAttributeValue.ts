import type { ProductAttributeView } from "./ProductAttributeView";

export function getAttributeValue(attr: ProductAttributeView): string {
  if (attr.valueType === "Text") return attr.textValue ?? "";
  if (attr.valueType === "Number")
    return attr.numberValue != null
      ? `${attr.numberValue}${attr.unit ? " " + attr.unit : ""}`
      : "";
  if (attr.valueType === "Boolean") return attr.boolValue ? "Так" : "Ні";
  if (attr.valueType === "Select") {
    const opt = attr.options.find((o) => o.id === attr.optionId);
    return opt ? `${opt.value}${attr.unit ? " " + attr.unit : ""}` : "";
  }
  if (attr.valueType === "MultiSelect")
    return attr.options
      .filter((o) => attr.optionIds.includes(o.id))
      .map((o) => o.value)
      .join(", ");
  return "";
}
