import { describe, expect, test } from "bun:test";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card";
import React from "react";

describe("Card", () => {
  test("renders with children", () => {
    const card = Card({ children: "Card content" });
    expect(card.props.children).toBe("Card content");
  });

  test("has data-slot attribute", () => {
    const card = Card({ children: "Test" });
    expect(card.props["data-slot"]).toBe("card");
  });

  test("has base styling", () => {
    const card = Card({ children: "Test" });
    expect(card.props.className).toContain("rounded-xl");
    expect(card.props.className).toContain("border");
  });

  test("applies custom className", () => {
    const card = Card({ className: "custom-card", children: "Test" });
    expect(card.props.className).toContain("custom-card");
  });
});

describe("CardHeader", () => {
  test("renders with children", () => {
    const header = CardHeader({ children: "Header" });
    expect(header.props.children).toBe("Header");
  });

  test("has data-slot attribute", () => {
    const header = CardHeader({ children: "Test" });
    expect(header.props["data-slot"]).toBe("card-header");
  });

  test("applies custom className", () => {
    const header = CardHeader({ className: "custom-header", children: "Test" });
    expect(header.props.className).toContain("custom-header");
  });
});

describe("CardTitle", () => {
  test("renders with children", () => {
    const title = CardTitle({ children: "Title" });
    expect(title.props.children).toBe("Title");
  });

  test("has data-slot attribute", () => {
    const title = CardTitle({ children: "Test" });
    expect(title.props["data-slot"]).toBe("card-title");
  });

  test("has font styling", () => {
    const title = CardTitle({ children: "Test" });
    expect(title.props.className).toContain("font-semibold");
  });
});

describe("CardDescription", () => {
  test("renders with children", () => {
    const desc = CardDescription({ children: "Description" });
    expect(desc.props.children).toBe("Description");
  });

  test("has data-slot attribute", () => {
    const desc = CardDescription({ children: "Test" });
    expect(desc.props["data-slot"]).toBe("card-description");
  });

  test("has muted text color", () => {
    const desc = CardDescription({ children: "Test" });
    expect(desc.props.className).toContain("text-muted-foreground");
  });
});

describe("CardAction", () => {
  test("renders with children", () => {
    const action = CardAction({ children: "Action" });
    expect(action.props.children).toBe("Action");
  });

  test("has data-slot attribute", () => {
    const action = CardAction({ children: "Test" });
    expect(action.props["data-slot"]).toBe("card-action");
  });
});

describe("CardContent", () => {
  test("renders with children", () => {
    const content = CardContent({ children: "Content" });
    expect(content.props.children).toBe("Content");
  });

  test("has data-slot attribute", () => {
    const content = CardContent({ children: "Test" });
    expect(content.props["data-slot"]).toBe("card-content");
  });

  test("has padding", () => {
    const content = CardContent({ children: "Test" });
    expect(content.props.className).toContain("px-6");
  });
});

describe("CardFooter", () => {
  test("renders with children", () => {
    const footer = CardFooter({ children: "Footer" });
    expect(footer.props.children).toBe("Footer");
  });

  test("has data-slot attribute", () => {
    const footer = CardFooter({ children: "Test" });
    expect(footer.props["data-slot"]).toBe("card-footer");
  });

  test("has flex layout", () => {
    const footer = CardFooter({ children: "Test" });
    expect(footer.props.className).toContain("flex");
  });
});
