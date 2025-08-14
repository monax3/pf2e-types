import eslint from "@eslint/js";
import type { Linter } from "eslint";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import tseslint, { configs as tseconfigs } from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseconfigs.stylisticTypeChecked,
    ...tseconfigs.strictTypeChecked,
    prettier,
    {
        rules: {
            "@typescript-eslint/no-extraneous-class": "off",
            "@typescript-eslint/no-unnecessary-type-parameters": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
        } satisfies Linter.RulesRecord,
    },

    globalIgnores([
        "types/pf2e/global.d.ts",
        "types/pf2e/{module,scripts,util}/**/*",
        "types/foundry/**/*",
        "tests/*.d.ts",
    ]),
    {
        languageOptions: {
            globals: { ...globals.node },
            parser: tsParser,
            parserOptions: {
                impliedStrict: true,
                tsconfigRootDir: import.meta.dirname,

                projectService: {
                    defaultProject: "tsconfig.json",
                    allowDefaultProject: ["eslint.config.mts"],
                },
            },
        },
    },
);
