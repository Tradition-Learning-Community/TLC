export type StaffRole = "owner" | "publisher" | "editor" | "relations";
export type Permission =
  | "staff:manage" | "editorial:write" | "editorial:publish"
  | "data:manage" | "contributors:manage" | "media:upload"
  | "inquiries:read" | "inquiries:write" | "notifications:manage";
export const roles: StaffRole[] = ["owner", "publisher", "editor", "relations"];
export const roleLabels: Record<StaffRole, string> = {
  owner: "Responsable général", publisher: "Responsable éditorial",
  editor: "Rédaction", relations: "Relations & demandes",
};
const grants: Record<StaffRole, readonly Permission[]> = {
  owner: ["staff:manage", "editorial:write", "editorial:publish", "data:manage",
    "contributors:manage", "media:upload", "inquiries:read", "inquiries:write", "notifications:manage"],
  publisher: ["editorial:write", "editorial:publish", "data:manage", "contributors:manage", "media:upload"],
  editor: ["editorial:write", "media:upload"],
  relations: ["inquiries:read", "inquiries:write", "notifications:manage"],
};
export function permissionsFor(role: StaffRole): Permission[] { return [...grants[role]]; }
export function hasPermission(role: StaffRole, permission: Permission) { return grants[role].includes(permission); }
export function isStaffRole(value: unknown): value is StaffRole {
  return typeof value === "string" && roles.some((role) => role === value);
}
