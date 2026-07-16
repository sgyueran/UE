const capabilityGroups = [
  {
    title: "Gameplay & Systems",
    description: "State, interaction, and gameplay architecture evidence will appear after verified projects are approved.",
  },
  {
    title: "Rendering & Optimization",
    description: "Profiling captures, frame-time evidence, and rendering constraints are pending verified public sources.",
  },
  {
    title: "Tools & Pipelines",
    description: "Editor tooling, production workflow, and automation examples require project-level confirmation.",
  },
  {
    title: "Technical Art",
    description: "Material, Niagara, shader, PCG, and scene-building work will be connected to approved media only.",
  },
  {
    title: "C++ / Blueprints",
    description: "Implementation split and architecture notes will stay pending until source evidence is verified.",
  },
];

export function HomeSkillsDirection() {
  return (
    <section aria-labelledby="skills-title" className="app-container py-section">
      <div className="grid gap-2xl lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-sm text-sm font-semibold uppercase text-primary">Work direction</p>
          <h2 className="text-3xl font-semibold leading-tight text-text md:text-4xl" id="skills-title">
            Capability areas are staged for evidence, not claimed ahead of verification.
          </h2>
          <p className="mt-md text-base leading-7 text-muted">
            The portfolio structure is ready to connect UE5 work to project proof. Until source material is public and
            verified, each capability remains in a pending evidence state.
          </p>
        </div>

        <div className="grid gap-md sm:grid-cols-2">
          {capabilityGroups.map((group) => (
            <article className="rounded-lg border border-border/75 bg-card/70 p-lg" key={group.title}>
              <div className="mb-md h-1 w-10 rounded-pill bg-primary" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-text">{group.title}</h3>
              <p className="mt-sm text-sm leading-6 text-muted">{group.description}</p>
              <p className="mt-md font-mono text-xs uppercase tracking-[0.16em] text-muted">Evidence pending</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
