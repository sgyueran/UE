import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SeoHead } from "@/lib/seo";

const managedSelector = '[data-seo-managed="true"]';

describe("SeoHead", () => {
  it("writes the home page title, robots, canonical link, and favicon", () => {
    render(<SeoHead path="/" />);

    expect(document.title).toBe("Release preview | UE Portfolio");
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex,nofollow");
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toContain("Safe non-indexed");
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://sgyueran.github.io/UE/");
    expect(document.head.querySelector('link[rel="icon"]')?.getAttribute("href")).toBe("/UE/favicon.svg");
  });

  it("replaces managed metadata without duplicating nodes when the path changes", () => {
    const { rerender } = render(<SeoHead path="/" />);
    const initialManagedCount = document.head.querySelectorAll(managedSelector).length;

    expect(initialManagedCount).toBeGreaterThan(0);

    rerender(<SeoHead path="/about" />);

    expect(document.head.querySelectorAll(managedSelector).length).toBe(initialManagedCount);
    expect(document.title).toBe("About preview | UE Portfolio");
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://sgyueran.github.io/UE/about",
    );
  });

  it("does not publish TODO placeholders in the rendered head", () => {
    render(<SeoHead path="/projects" />);

    expect(document.head.innerHTML).not.toContain("TODO(USER_INPUT)");
  });
});
