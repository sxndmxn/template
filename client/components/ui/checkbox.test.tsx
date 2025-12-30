import { describe, expect, test } from "bun:test";
import { Checkbox } from "./checkbox";
import React from "react";

describe("Checkbox", () => {
  test("renders with default props", () => {
    const checkbox = Checkbox({});
    expect(checkbox.type).toBeDefined();
  });

  test("has data-slot attribute", () => {
    const checkbox = Checkbox({});
    expect(checkbox.props["data-slot"]).toBe("checkbox");
  });

  test("has base styling", () => {
    const checkbox = Checkbox({});
    expect(checkbox.props.className).toContain("size-4");
    expect(checkbox.props.className).toContain("rounded-[4px]");
  });

  test("applies custom className", () => {
    const checkbox = Checkbox({ className: "custom-checkbox" });
    expect(checkbox.props.className).toContain("custom-checkbox");
  });

  test("passes through Radix props", () => {
    const checkbox = Checkbox({ disabled: true, checked: true });
    expect(checkbox.props.disabled).toBe(true);
    expect(checkbox.props.checked).toBe(true);
  });

  test("contains indicator component", () => {
    const checkbox = Checkbox({});
    expect(checkbox.props.children).toBeDefined();
  });
});
