import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectsListing } from "@/features/projects";

describe("ProjectsListing", () => {
  it("shows the verified index heading with a safe empty state when no public projects exist", () => {
    render(<ProjectsListing />);

    expect(screen.getByRole("heading", { level: 1, name: "Verified project index" })).toBeInTheDocument();
    expect(screen.getByText(/Project entries are unavailable until verified/i)).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("does not fabricate project cards, filters, or TODO placeholders", () => {
    render(<ProjectsListing />);

    expect(screen.queryByRole("button", { name: "All" })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toContain("TODO(USER_INPUT)");
  });
});
