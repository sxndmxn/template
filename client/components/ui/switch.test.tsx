import { describe, expect, test } from "bun:test";
import { Switch } from "./switch";
import React from "react";

describe("Switch", () => {
  test("renders with default props", () => {
    const switchComponent = Switch({});
    expect(switchComponent.type).toBeDefined();
  });

  test("has data-slot attribute", () => {
    const switchComponent = Switch({});
    expect(switchComponent.props["data-slot"]).toBe("switch");
  });

  test("has base styling", () => {
    const switchComponent = Switch({});
    expect(switchComponent.props.className).toContain("h-[1.15rem]");
    expect(switchComponent.props.className).toContain("w-8");
  });

  test("applies custom className", () => {
    const switchComponent = Switch({ className: "custom-switch" });
    expect(switchComponent.props.className).toContain("custom-switch");
  });

  test("passes through Radix props", () => {
    const switchComponent = Switch({ disabled: true, checked: true });
    expect(switchComponent.props.disabled).toBe(true);
    expect(switchComponent.props.checked).toBe(true);
  });

  test("contains thumb component", () => {
    const switchComponent = Switch({});
    expect(switchComponent.props.children).toBeDefined();
  });
});
