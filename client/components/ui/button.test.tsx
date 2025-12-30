import { describe, expect, test } from "bun:test";
import { Button, buttonVariants } from "./button";
import React from "react";

describe("Button", () => {
  test("renders with default props", () => {
    const button = Button({ children: "Click me" });
    expect(button.props.children).toBe("Click me");
    expect(button.props.className).toContain("bg-primary");
  });

  test("renders with destructive variant", () => {
    const button = Button({ variant: "destructive", children: "Delete" });
    expect(button.props.className).toContain("bg-destructive");
  });

  test("renders with outline variant", () => {
    const button = Button({ variant: "outline", children: "Cancel" });
    expect(button.props.className).toContain("border");
  });

  test("renders with secondary variant", () => {
    const button = Button({ variant: "secondary", children: "Submit" });
    expect(button.props.className).toContain("bg-secondary");
  });

  test("renders with ghost variant", () => {
    const button = Button({ variant: "ghost", children: "Ghost" });
    expect(button.props.className).toContain("hover:bg-accent");
  });

  test("renders with link variant", () => {
    const button = Button({ variant: "link", children: "Link" });
    expect(button.props.className).toContain("underline-offset-4");
  });

  test("renders with small size", () => {
    const button = Button({ size: "sm", children: "Small" });
    expect(button.props.className).toContain("h-8");
  });

  test("renders with large size", () => {
    const button = Button({ size: "lg", children: "Large" });
    expect(button.props.className).toContain("h-10");
  });

  test("renders with icon size", () => {
    const button = Button({ size: "icon", children: "I" });
    expect(button.props.className).toContain("size-9");
  });

  test("applies custom className", () => {
    const button = Button({ className: "custom-btn", children: "Custom" });
    expect(button.props.className).toContain("custom-btn");
  });

  test("renders as child component when asChild is true", () => {
    const button = Button({ asChild: true, children: "Child" });
    expect(button.type).not.toBe("button");
  });

  test("has data-slot attribute", () => {
    const button = Button({ children: "Test" });
    expect(button.props["data-slot"]).toBe("button");
  });

  test("passes through native button props", () => {
    const button = Button({ type: "submit", disabled: true, children: "Submit" });
    expect(button.props.type).toBe("submit");
    expect(button.props.disabled).toBe(true);
  });
});

describe("buttonVariants", () => {
  test("returns default variant and size classes", () => {
    const classes = buttonVariants();
    expect(classes).toContain("bg-primary");
    expect(classes).toContain("h-9");
  });

  test("combines variant and size options", () => {
    const classes = buttonVariants({ variant: "destructive", size: "lg" });
    expect(classes).toContain("bg-destructive");
    expect(classes).toContain("h-10");
  });
});
