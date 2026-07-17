import { getPortfolioProfile, hasTodoUserInput } from "@/lib/content";

function isSafeText(value: string): boolean {
  return value.trim().length > 0 && !hasTodoUserInput(value);
}

const workflowPrinciples = [
  "Start from constraints, ownership, and evidence.",
  "Keep architecture and implementation decisions traceable.",
  "Connect systems, media, and outcomes only after public verification.",
];

export function AboutNarrative() {
  const profile = getPortfolioProfile().data;
  const title = profile?.professionalTitle ?? "UE5 Engineer";
  const summary =
    profile && isSafeText(profile.professionalSummary)
      ? profile.professionalSummary
      : "A public About narrative is pending verified user-provided background, specialization, and work direction.";

  return (
    <div className="app-container py-section">
      <section aria-labelledby="about-title" className="grid gap-2xl lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-sm text-sm font-semibold uppercase text-primary">About</p>
          <h1 className="text-4xl font-semibold leading-tight text-text md:text-6xl" id="about-title">
            {title}
          </h1>
          <p className="mt-md text-base leading-7 text-muted">{summary}</p>
        </div>

        <div className="grid gap-md">
          <article className="rounded-lg border border-border bg-card/72 p-lg">
            <h2 className="text-xl font-semibold text-text">Engineering method</h2>
            <ul className="mt-md grid gap-sm text-sm leading-6 text-muted">
              {workflowPrinciples.map((principle) => (
                <li className="flex gap-sm" key={principle}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-dashed border-border bg-background/65 p-lg">
            <h2 className="text-xl font-semibold text-text">Public profile status</h2>
            <p className="mt-md text-sm leading-6 text-muted">
              Personal story, career details, location, availability, and resume claims remain unavailable until the
              source profile is verified and approved for public release.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
