// Mock Next.js Image component for tests
import { mock } from "bun:test";

// Mock next/image
mock.module("next/image", () => ({
  default: ({ src, alt, ...props }: any) => {
    return { type: "img", props: { src, alt, ...props } };
  },
}));
