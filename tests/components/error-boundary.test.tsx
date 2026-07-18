import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ErrorBoundary } from "@/app/ErrorBoundary";

function BrokenView(): never {
  throw new Error("Intentional test render failure");
}

describe("ErrorBoundary", () => {
  it("shows an actionable fallback with a deployment-safe return link when a child throws", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <BrokenView />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/UE/");
    expect(
      consoleError.mock.calls.some(([firstArgument]) => String(firstArgument).includes("Unhandled portfolio route error")),
    ).toBe(true);
  });

  it("renders children normally when nothing throws", () => {
    render(
      <ErrorBoundary>
        <p>Healthy content</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Healthy content")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Something went wrong" })).not.toBeInTheDocument();
  });
});
