import { describe, expect, test } from "bun:test";
import { Skeleton } from "./skeleton";
import React from "react";

describe("Skeleton", () => {
  test("renders with default props", () => {
    const skeleton = Skeleton({});
    expect(skeleton.type).toBe("div");
  });

  test("has data-slot attribute", () => {
    const skeleton = Skeleton({});
    expect(skeleton.props["data-slot"]).toBe("skeleton");
  });

  test("has animate-pulse class", () => {
    const skeleton = Skeleton({});
    expect(skeleton.props.className).toContain("animate-pulse");
  });

  test("has background styling", () => {
    const skeleton = Skeleton({});
    expect(skeleton.props.className).toContain("bg-accent");
  });

  test("has rounded corners", () => {
    const skeleton = Skeleton({});
    expect(skeleton.props.className).toContain("rounded-md");
  });

  test("applies custom className", () => {
    const skeleton = Skeleton({ className: "custom-skeleton" });
    expect(skeleton.props.className).toContain("custom-skeleton");
  });

  test("passes through div props", () => {
    const skeleton = Skeleton({ id: "test-id" });
    expect(skeleton.props.id).toBe("test-id");
  });
});
