import { describe, expect, test } from "bun:test";
import { Input } from "./input";
import React from "react";

describe("Input", () => {
  test("renders with default type", () => {
    const input = Input({});
    expect(input.type).toBe("input");
    expect(input.props["data-slot"]).toBe("input");
  });

  test("renders with text type", () => {
    const input = Input({ type: "text" });
    expect(input.props.type).toBe("text");
  });

  test("renders with email type", () => {
    const input = Input({ type: "email" });
    expect(input.props.type).toBe("email");
  });

  test("renders with password type", () => {
    const input = Input({ type: "password" });
    expect(input.props.type).toBe("password");
  });

  test("applies custom className", () => {
    const input = Input({ className: "custom-input" });
    expect(input.props.className).toContain("custom-input");
  });

  test("has base styling classes", () => {
    const input = Input({});
    expect(input.props.className).toContain("rounded-md");
    expect(input.props.className).toContain("border");
  });

  test("passes through native input props", () => {
    const input = Input({ placeholder: "Enter text", disabled: true });
    expect(input.props.placeholder).toBe("Enter text");
    expect(input.props.disabled).toBe(true);
  });

  test("has data-slot attribute", () => {
    const input = Input({});
    expect(input.props["data-slot"]).toBe("input");
  });
});
