import { describe, expect, test } from "bun:test";
import { Badge, badgeVariants } from "./badge";
import React from "react";

describe("Badge", () => {
  test("renders with default variant", () => {
    const badge = Badge({ children: "Test" });
    expect(badge.props.children).toBe("Test");
    expect(badge.props.className).toContain("bg-primary");
  });

  test("renders with secondary variant", () => {
    const badge = Badge({ variant: "secondary", children: "Test" });
    expect(badge.props.className).toContain("bg-secondary");
  });

  test("renders with destructive variant", () => {
    const badge = Badge({ variant: "destructive", children: "Test" });
    expect(badge.props.className).toContain("bg-destructive");
  });

  test("renders with outline variant", () => {
    const badge = Badge({ variant: "outline", children: "Test" });
    expect(badge.props.className).toContain("text-foreground");
  });

  test("applies custom className", () => {
    const badge = Badge({ className: "custom-class", children: "Test" });
    expect(badge.props.className).toContain("custom-class");
  });

  test("renders as child component when asChild is true", () => {
    const badge = Badge({ asChild: true, children: "Test" });
    expect(badge.type).not.toBe("span");
  });

  test("has data-slot attribute", () => {
    const badge = Badge({ children: "Test" });
    expect(badge.props["data-slot"]).toBe("badge");
  });
});

describe("badgeVariants", () => {
  test("returns default variant classes", () => {
    const classes = badgeVariants();
    expect(classes).toContain("bg-primary");
  });

  test("returns secondary variant classes", () => {
    const classes = badgeVariants({ variant: "secondary" });
    expect(classes).toContain("bg-secondary");
  });

  test("returns destructive variant classes", () => {
    const classes = badgeVariants({ variant: "destructive" });
    expect(classes).toContain("bg-destructive");
  });

  test("returns outline variant classes", () => {
    const classes = badgeVariants({ variant: "outline" });
    expect(classes).toContain("text-foreground");
  });
});
