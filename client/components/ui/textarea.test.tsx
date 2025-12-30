import { describe, expect, test } from "bun:test";
import { Textarea } from "./textarea";
import React from "react";

describe("Textarea", () => {
  test("renders with default props", () => {
    const textarea = Textarea({});
    expect(textarea.type).toBe("textarea");
  });

  test("has data-slot attribute", () => {
    const textarea = Textarea({});
    expect(textarea.props["data-slot"]).toBe("textarea");
  });

  test("has base styling", () => {
    const textarea = Textarea({});
    expect(textarea.props.className).toContain("rounded-md");
    expect(textarea.props.className).toContain("border");
  });

  test("applies custom className", () => {
    const textarea = Textarea({ className: "custom-textarea" });
    expect(textarea.props.className).toContain("custom-textarea");
  });

  test("passes through native textarea props", () => {
    const textarea = Textarea({ placeholder: "Enter text", rows: 5 });
    expect(textarea.props.placeholder).toBe("Enter text");
    expect(textarea.props.rows).toBe(5);
  });

  test("handles disabled state", () => {
    const textarea = Textarea({ disabled: true });
    expect(textarea.props.disabled).toBe(true);
  });
});
