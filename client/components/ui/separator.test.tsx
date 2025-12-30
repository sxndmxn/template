import { describe, expect, test } from "bun:test";
import { Separator } from "./separator";
import React from "react";

describe("Separator", () => {
  test("renders with default props", () => {
    const separator = Separator({});
    expect(separator.type).toBeDefined();
  });

  test("has data-slot attribute", () => {
    const separator = Separator({});
    expect(separator.props["data-slot"]).toBe("separator");
  });

  test("defaults to horizontal orientation", () => {
    const separator = Separator({});
    expect(separator.props.orientation).toBe("horizontal");
  });

  test("renders with vertical orientation", () => {
    const separator = Separator({ orientation: "vertical" });
    expect(separator.props.orientation).toBe("vertical");
  });

  test("is decorative by default", () => {
    const separator = Separator({});
    expect(separator.props.decorative).toBe(true);
  });

  test("applies custom className", () => {
    const separator = Separator({ className: "custom-separator" });
    expect(separator.props.className).toContain("custom-separator");
  });

  test("has background styling", () => {
    const separator = Separator({});
    expect(separator.props.className).toContain("bg-border");
  });
});
