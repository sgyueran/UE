import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectDetail } from "@/features/project-detail";

function setCurrentPath(path: string) {
  window.history.replaceState(null, "", path);
}

describe("ProjectDetail", () => {
  it("keeps unknown project routes in a safe unavailable state", () => {
    setCurrentPath("/projects/definitely-not-real");

    render(<ProjectDetail />);

    expect(screen.getByRole("heading", { level: 1, name: /unavailable until verified/i })).toBeInTheDocument();
  });

  it("does not leak TODO placeholders or the requested slug for missing projects", () => {
    setCurrentPath("/projects/private-secret-slug");

    render(<ProjectDetail />);

    expect(document.body.textContent).not.toContain("TODO(USER_INPUT)");
    expect(document.body.textContent).not.toContain("private-secret-slug");
  });

  it("handles routes without a project slug safely", () => {
    setCurrentPath("/");

    render(<ProjectDetail />);

    expect(screen.getByRole("heading", { level: 1, name: /not available for public viewing/i })).toBeInTheDocument();
  });
});
