import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Existing French JSX copy contains normal apostrophes and quotation marks.
      "react/no-unescaped-entities": "off",
      // Gradual typing is used by the existing admin/community API views.
      "@typescript-eslint/no-explicit-any": "off",
      // These effects synchronize data from API endpoints into local state.
      "react-hooks/set-state-in-effect": "off",
      // Keep existing internal anchors working until those views are migrated to Link.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
