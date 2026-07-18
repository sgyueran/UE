import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ReducedMotionProvider, useReducedMotion } from "@/app/providers";

import { getMediaQueryController } from "../setup";

function MotionProbe() {
  const prefersReducedMotion = useReducedMotion();

  return <p>{prefersReducedMotion ? "reduced motion" : "full motion"}</p>;
}

describe("ReducedMotionProvider", () => {
  it("starts from the current OS preference and syncs the document dataset", () => {
    render(
      <ReducedMotionProvider>
        <MotionProbe />
      </ReducedMotionProvider>,
    );

    expect(screen.getByText("full motion")).toBeInTheDocument();
    expect(document.documentElement.dataset.reducedMotion).toBe("false");
  });

  it("reacts to OS preference changes and keeps the dataset in sync", () => {
    render(
      <ReducedMotionProvider>
        <MotionProbe />
      </ReducedMotionProvider>,
    );

    const controller = getMediaQueryController("(prefers-reduced-motion: reduce)");
    act(() => {
      controller.setMatches(true);
    });

    expect(screen.getByText("reduced motion")).toBeInTheDocument();
    expect(document.documentElement.dataset.reducedMotion).toBe("true");
  });
});
