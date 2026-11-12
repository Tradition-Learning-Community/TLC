export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export type DataRecord = Record<string, unknown> & { id?: string };

function isRecord(value: unknown): value is DataRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requiredString(value: unknown, field: string, maxLength = 500) {
  if (typeof value !== "string" || !value.trim()) return `${field} is required`;
  if (value.trim().length > maxLength) return `${field} is too long`;
  return null;
}

function validateProject(value: DataRecord) {
  const titleError = requiredString(value.title, "title", 160);
  if (titleError) return titleError;
  if (value.description !== undefined && typeof value.description !== "string") return "description must be a string";
  if (value.members !== undefined && !Array.isArray(value.members)) return "members must be an array";
  if (value.tasks !== undefined && !Array.isArray(value.tasks)) return "tasks must be an array";
  return null;
}

const validators: Record<string, (value: DataRecord) => string | null> = {
  contributors: (value) => requiredString(value.name, "name", 160) || requiredString(value.github, "github", 500),
  profiles: (value) => requiredString(value.name, "name", 160) || requiredString(value.role, "role", 160),
  projects: validateProject,
  events: (value) => requiredString(value.title, "title", 160) || requiredString(value.date, "date", 40) || requiredString(value.type, "type", 80),
  resources: (value) => requiredString(value.title, "title", 160) || requiredString(value.category, "category", 80),
  experiments: (value) => requiredString(value.title, "title", 160),
  "open-calls": (value) => requiredString(value.title, "title", 160) || requiredString(value.description, "description", 2000),
  discussions: (value) => requiredString(value.title, "title", 160),
};

export function validateDataRecord(collection: string, value: unknown): ValidationResult<DataRecord> {
  if (!isRecord(value)) return { ok: false, error: "Body must be a JSON object" };
  const validator = validators[collection];
  const error = validator?.(value);
  return error ? { ok: false, error } : { ok: true, value };
}

