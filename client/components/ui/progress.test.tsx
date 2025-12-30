import { describe, expect, test } from "bun:test";
import { Progress } from "./progress";
import React from "react";

describe("Progress", () => {
  test("renders with default props", () => {
    const progress = Progress({});
    expect(progress.type).toBeDefined();
  });

  test("has data-slot attribute", () => {
    const progress = Progress({});
    expect(progress.props["data-slot"]).toBe("progress");
  });

  test("has base styling", () => {
    const progress = Progress({});
    expect(progress.props.className).toContain("rounded-full");
    expect(progress.props.className).toContain("h-2");
  });

  test("applies custom className", () => {
    const progress = Progress({ className: "custom-progress" });
    expect(progress.props.className).toContain("custom-progress");
  });

  test("renders with value", () => {
    const progress = Progress({ value: 50 });
    expect(progress.type).toBeDefined();
  });

  test("contains indicator component", () => {
    const progress = Progress({ value: 75 });
    expect(progress.props.children).toBeDefined();
  });

  test("indicator has correct transform at 0%", () => {
    const progress = Progress({ value: 0 });
    const indicator = progress.props.children;
    expect(indicator.props.style.transform).toBe("translateX(-100%)");
  });

  test("indicator has correct transform at 100%", () => {
    const progress = Progress({ value: 100 });
    const indicator = progress.props.children;
    expect(indicator.props.style.transform).toBe("translateX(-0%)");
  });

  test("indicator has correct transform at 50%", () => {
    const progress = Progress({ value: 50 });
    const indicator = progress.props.children;
    expect(indicator.props.style.transform).toBe("translateX(-50%)");
  });
});
