import { describe, expect, test } from "bun:test";
import { Label } from "./label";
import React from "react";

describe("Label", () => {
  test("renders with children", () => {
    const label = Label({ children: "Name" });
    expect(label.props.children).toBe("Name");
  });

  test("has data-slot attribute", () => {
    const label = Label({ children: "Test" });
    expect(label.props["data-slot"]).toBe("label");
  });

  test("has base styling", () => {
    const label = Label({ children: "Test" });
    expect(label.props.className).toContain("text-sm");
    expect(label.props.className).toContain("font-medium");
  });

  test("applies custom className", () => {
    const label = Label({ className: "custom-label", children: "Test" });
    expect(label.props.className).toContain("custom-label");
  });

  test("passes through Radix props", () => {
    const label = Label({ htmlFor: "input-id", children: "Test" });
    expect(label.props.htmlFor).toBe("input-id");
  });
});
