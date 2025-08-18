import * as ts from "typescript";
import fs from "node:fs/promises";
import path from "node:path";
import foundryAPI from "./foundry-api.json" with { type: "json" };

async function readTsConfig(fileName: string) {
    const text = await fs.readFile(fileName, "utf8");

    const result = ts.parseConfigFileTextToJson(fileName, text);
    if (!result.config) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        reportDiagnostic(result.error!);
        process.exit(1);
    }

    const config = ts.parseJsonConfigFileContent(result.config, ts.sys, path.dirname(fileName));
    if (config.errors.length > 0) {
        for (const diagnostic of config.errors) {
            reportDiagnostic(diagnostic);
        }
        process.exit(1);
    }
    return config;
}

const asModule = (namespace: string): string => `pf2e-types/${namespace.replaceAll(".", "/")}`;

function parseItem(item: string) {
    const segments = item.split(".");

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const base = segments.at(-1)!;
    const ident = item.replaceAll(".", "_");

    const namespace = segments.slice(0, -1).join(".");
    const module = asModule(namespace);

    return { base, ident, namespace, module };
}

interface TestDef {
    name: string;
    fileName: string;
    toCode: (item: string) => string;
}

interface TestGroupDef {
    name: string;
    items: string[];
    children: TestDef[];
}

interface TestData {
    items: string[];
    missing: Set<string>;
}

type Test = TestDef & TestData;

interface TestGroup extends TestGroupDef, TestData {
    children: Test[];
}

const TESTS: TestGroupDef[] = [
    {
        name: "Namespaces",
        items: foundryAPI.Namespace,
        children: [
            {
                fileName: "tests/modules.d.ts",
                name: "Namespaces Impl",
                toCode: (item: string) => {
                    const it = parseItem(item);
                    return `export type * as ${it.ident} from "${asModule(item)}";`;
                },
            },
        ],
    },
    {
        name: "Types",
        items: [...foundryAPI.Interface, ...foundryAPI["Type Alias"]].filter((t) => !t.includes("._")),
        children: [
            {
                fileName: "tests/imported_types.d.ts",
                name: "Imported Types",
                toCode: (item: string) => {
                    const it = parseItem(item);
                    return `export type { ${it.base} as ${it.ident} } from "${it.module}";`;
                },
            },
            {
                fileName: "tests/namespaced_types.d.ts",
                name: "Namespaced Types",
                toCode: (item: string) => {
                    const it = parseItem(item);
                    return `export type ${it.ident} = ${item};`;
                },
            },
        ],
    },
    {
        name: "Values",
        items: [...foundryAPI.Class, ...foundryAPI.Function, ...foundryAPI.Variable].filter((t) => !t.includes("._")),
        children: [
            {
                fileName: "tests/imported_values.d.ts",
                name: "Imported Values",
                toCode: (item: string) => {
                    const it = parseItem(item);
                    return `export { ${it.base} as ${it.ident} } from "${it.module}";`;
                },
            },
            {
                fileName: "tests/namespaced_values.d.ts",
                name: "Namespaced Values",
                toCode: (item: string) => {
                    const it = parseItem(item);
                    return `export type ${it.ident} = typeof ${item};`;
                },
            },
        ],
    },
];

const testGroups: TestGroup[] = TESTS.map((group) => {
    return {
        ...group,
        children: group.children.map((t) => ({ ...t, items: group.items, missing: new Set() })),
        missing: new Set(group.items),
    };
});

const runnable = new Map<string, Test>(
    testGroups.flatMap((group) => group.children.map((test) => [test.fileName, test])),
);

for (const [fileName, options] of runnable.entries()) {
    await fs.writeFile(fileName, options.items.map(options.toCode).join("\n"), "utf8");
}

function reportDiagnostic(diagnostic: ts.Diagnostic): void {
    let message = "";

    if (diagnostic.file && diagnostic.start) {
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        message += ` ${diagnostic.file.fileName} (${line + 1},${character + 1}) `;
    }

    message += `(ts${diagnostic.code}): ` + ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

    console.error(message);
}

const IGNORE_ERROR_CODES = new Set([
    2314, // Generic type requires type arguments
]);

const TYPECK_ERROR_CODES = new Set([
    2339, // Property '{name}' does not exist on type
    2551, // Property '{name}' does not exist on type. Did you mean?
    2694, // Namespace '{name}' has no exported member
    2305, // Module '{name}' has no exported member
    2614, // Module '{name}' has no exported member. Did you mean default?
    2307, // Cannot find module '{name}'
    2724, // Namespace '{name}' has no exported member. Did you mean?
]);

const tsconfig = await readTsConfig("./tsconfig.json");

const program = ts.createProgram([...tsconfig.fileNames, ...runnable.keys()], tsconfig.options);
const emitResult = program.emit();
const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

for (const diagnostic of allDiagnostics) {
    const opts = diagnostic.file?.fileName && runnable.get(diagnostic.file.fileName);
    if (opts && IGNORE_ERROR_CODES.has(diagnostic.code)) {
        continue;
    } else if (opts && TYPECK_ERROR_CODES.has(diagnostic.code)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { line } = ts.getLineAndCharacterOfPosition(diagnostic.file!, diagnostic.start!);
        opts.missing.add(opts.items[line]);
    } else {
        reportDiagnostic(diagnostic);
    }
}

for (const group of testGroups) {
    group.missing = group.children.reduce(
        (intersection, item) => intersection.intersection(item.missing),
        group.missing,
    );

    for (const t of group.children) {
        t.missing = t.missing.difference(group.missing);
    }
}

await fs.writeFile('correctness.md', ['# API correctness', '', ...testGroups.flatMap((options) => {
    const items = options.items
        .toSorted()
        // .filter((item) => options.missing.has(item))
        .map((item) => `- ${options.missing.has(item) ? '[ ]' : '[x]'} ${item}`);

    return [`## ${options.name}`, '', ...items, ''];
})].join('\n'), 'utf8');
