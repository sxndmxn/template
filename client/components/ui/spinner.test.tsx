import { describe, expect, test } from "bun:test";
import { Spinner } from "./spinner";
import React from "react";

describe("Spinner", () => {
  test("renders with default props", () => {
    const spinner = Spinner({});
    expect(spinner.type).toBeDefined();
    expect(spinner.props.role).toBe("status");
  });

  test("has aria-label for accessibility", () => {
    const spinner = Spinner({});
    expect(spinner.props["aria-label"]).toBe("Loading");
  });

  test("has animate-spin class", () => {
    const spinner = Spinner({});
    expect(spinner.props.className).toContain("animate-spin");
  });

  test("has default size", () => {
    const spinner = Spinner({});
    expect(spinner.props.className).toContain("size-4");
  });

  test("applies custom className", () => {
    const spinner = Spinner({ className: "custom-size" });
    expect(spinner.props.className).toContain("custom-size");
  });

  test("passes through svg props", () => {
    const spinner = Spinner({ "aria-label": "Custom loading" });
    expect(spinner.props["aria-label"]).toBe("Custom loading");
  });
});
