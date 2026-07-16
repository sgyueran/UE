import {
  TODO_USER_INPUT,
  type ContentIssue,
  type ContentProvenance,
  type ExternalLink,
  type PortfolioProject,
  type ProjectMedia,
  type PublicationStatus,
} from "@/types/content";

type IdentifiedContent = {
  readonly id: string;
};

type SluggedContent = {
  readonly slug?: string;
};

type OrderedContent = {
  readonly order?: number;
};

type PathContent = {
  readonly path?: string;
};

type ProvenanceContent = {
  readonly provenance?: ContentProvenance;
};

const TODO_PATTERN = new RegExp(TODO_USER_INPUT.replace("(", "\\(").replace(")", "\\)"));

export function createContentIssue(
  code: string,
  message: string,
  severity: ContentIssue["severity"],
  field?: string,
): ContentIssue {
  return { code, field, message, severity };
}

function collectDuplicateIssues<T>(
  items: readonly T[],
  selectValue: (item: T) => string | number | undefined,
  code: string,
  label: string,
): readonly ContentIssue[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    const rawValue = selectValue(item);

    if (rawValue === undefined) {
      continue;
    }

    const value = String(rawValue);

    if (seen.has(value)) {
      duplicates.add(value);
      continue;
    }

    seen.add(value);
  }

  return Array.from(duplicates).map((value) =>
    createContentIssue(code, `Duplicate ${label} detected: ${value}.`, "error", label),
  );
}

export function hasTodoUserInput(value: unknown): boolean {
  if (typeof value === "string") {
    return TODO_PATTERN.test(value);
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasTodoUserInput(item));
  }

  if (value !== null && typeof value === "object") {
    return Object.values(value).some((entry) => hasTodoUserInput(entry));
  }

  return false;
}

export function validateIdentifiedContent<T extends IdentifiedContent>(
  items: readonly T[],
): readonly ContentIssue[] {
  if (items.length === 0) {
    return [createContentIssue("content.empty", "Expected at least one content item.", "error")];
  }

  return collectDuplicateIssues(items, (item) => item.id, "content.duplicate_id", "id");
}

export function validateSluggedContent<T extends IdentifiedContent & SluggedContent>(
  items: readonly T[],
): readonly ContentIssue[] {
  return [
    ...validateIdentifiedContent(items),
    ...collectDuplicateIssues(items, (item) => item.slug, "content.duplicate_slug", "slug"),
  ];
}

export function validateNavigationContent<T extends IdentifiedContent & OrderedContent & PathContent>(
  items: readonly T[],
): readonly ContentIssue[] {
  return [
    ...validateIdentifiedContent(items),
    ...collectDuplicateIssues(items, (item) => item.path, "navigation.duplicate_path", "path"),
    ...collectDuplicateIssues(items, (item) => item.order, "navigation.duplicate_order", "order"),
  ];
}

export function validateContentProvenance<T extends ProvenanceContent>(
  items: readonly T[],
): readonly ContentIssue[] {
  const issues: ContentIssue[] = [];

  items.forEach((item, index) => {
    if (item.provenance === undefined) {
      issues.push(
        createContentIssue("content.missing_provenance", `Content item at index ${index} has no provenance.`, "error"),
      );
    }
  });

  return issues;
}

export function createTodoIssue(message: string, field?: string): ContentIssue {
  return createContentIssue("content.todo_user_input", message, "warning", field);
}

function isPublicStatus(status: PublicationStatus): boolean {
  return status === "public";
}

function validatePublicLink(link: ExternalLink): readonly ContentIssue[] {
  const issues: ContentIssue[] = [];

  if (link.verification !== "verified") {
    issues.push(
      createContentIssue("content.link_unverified", `Link ${link.id} is not verified.`, "error", `links.${link.id}`),
    );
  }

  if (!isPublicStatus(link.publicationStatus)) {
    issues.push(
      createContentIssue(
        "content.link_not_public",
        `Link ${link.id} is not approved for public release.`,
        "error",
        `links.${link.id}`,
      ),
    );
  }

  if (hasTodoUserInput(link)) {
    issues.push(createTodoIssue(`Link ${link.id} still contains TODO(USER_INPUT).`, `links.${link.id}`));
  }

  return issues;
}

function validatePublicMedia(media: ProjectMedia): readonly ContentIssue[] {
  const issues: ContentIssue[] = [];

  if (!isPublicStatus(media.publicationStatus)) {
    issues.push(
      createContentIssue(
        "content.media_not_public",
        `Media ${media.id} is not approved for public release.`,
        "error",
        `media.${media.id}`,
      ),
    );
  }

  if (media.provenance.status !== "verified") {
    issues.push(
      createContentIssue("content.media_unverified", `Media ${media.id} has unverified provenance.`, "error", `media.${media.id}`),
    );
  }

  if (hasTodoUserInput(media)) {
    issues.push(createTodoIssue(`Media ${media.id} still contains TODO(USER_INPUT).`, `media.${media.id}`));
  }

  return issues;
}

export function validateProjectPublicationSafety(project: PortfolioProject): readonly ContentIssue[] {
  const issues: ContentIssue[] = [];

  if (project.status !== "verified") {
    issues.push(createContentIssue("content.project_unverified", "Project content is not verified.", "error", "status"));
  }

  if (!isPublicStatus(project.publicationStatus)) {
    issues.push(
      createContentIssue(
        "content.project_not_public",
        "Project is not approved for public publication.",
        "error",
        "publicationStatus",
      ),
    );
  }

  if (project.safety.containsNdaMaterial !== false) {
    issues.push(createContentIssue("content.project_nda_unknown", "NDA safety is not cleared.", "error", "safety.containsNdaMaterial"));
  }

  if (project.safety.containsPrivateCode !== false) {
    issues.push(
      createContentIssue("content.project_private_code_unknown", "Private-code safety is not cleared.", "error", "safety.containsPrivateCode"),
    );
  }

  if (project.safety.requiresAnonymization !== false && project.publicationStatus === "public") {
    issues.push(
      createContentIssue("content.project_anonymization_required", "Public project still requires anonymization.", "error", "safety.requiresAnonymization"),
    );
  }

  if (project.outcome.provenance.status !== "verified") {
    issues.push(createContentIssue("content.outcome_unverified", "Project outcome is not verified.", "error", "outcome"));
  }

  if (hasTodoUserInput(project)) {
    issues.push(createTodoIssue("Project still contains TODO(USER_INPUT) placeholders."));
  }

  project.media.forEach((media) => {
    issues.push(...validatePublicMedia(media));
  });

  project.links.forEach((link) => {
    issues.push(...validatePublicLink(link));
  });

  return issues;
}
