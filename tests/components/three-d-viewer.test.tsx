import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThreeDViewer } from "@/features/viewer/ThreeDViewer";
import { TODO_USER_INPUT } from "@/types/content";

describe("ThreeDViewer safe fallbacks", () => {
  it("shows a static fallback without initializing a canvas when no model is provided", () => {
    const { container } = render(<ThreeDViewer model={null} />);

    expect(screen.getByRole("heading", { name: "3D model unavailable" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /load model/i })).not.toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("rejects TODO placeholder models without attempting viewer load", () => {
    const { container } = render(<ThreeDViewer model={{ src: TODO_USER_INPUT, alt: TODO_USER_INPUT }} />);

    expect(screen.getByText(/No verified public GLB model is approved/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("rejects empty-string model sources", () => {
    render(<ThreeDViewer model={{ src: "   ", alt: "   " }} />);

    expect(screen.getByRole("heading", { name: "3D model unavailable" })).toBeInTheDocument();
  });
});
